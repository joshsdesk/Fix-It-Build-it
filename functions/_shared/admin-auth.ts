export const ADMIN_USERNAMES = ["JoshsDesk", "MarysDesk"] as const;
export const ADMIN_SESSION_COOKIE = "fibi_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const PASSWORD_ITERATIONS = 210_000;
const encoder = new TextEncoder();

export interface AdminAuthEnv {
    DB: D1Database;
    ADMIN_SESSION_SECRET?: string;
    ADMIN_BOOTSTRAP_TOKEN?: string;
}

interface SessionPayload {
    username: string;
    version: number;
    expiresAt: number;
}

function bytesToBase64Url(bytes: Uint8Array): string {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlToBytes(value: string): Uint8Array {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
    if (left.length !== right.length) return false;
    let difference = 0;
    for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
    return difference === 0;
}

export function constantTimeStringEqual(left: string, right: string): boolean {
    return constantTimeEqual(encoder.encode(left), encoder.encode(right));
}

async function sign(value: string, secret: string): Promise<Uint8Array> {
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export function isConfigured(env: AdminAuthEnv): boolean {
    return Boolean(env.DB && env.ADMIN_SESSION_SECRET && env.ADMIN_SESSION_SECRET.length >= 32);
}

export async function createSessionCookie(username: string, version: number, secret: string, requestUrl: string): Promise<string> {
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
    const payload = bytesToBase64Url(encoder.encode(JSON.stringify({ username, version, expiresAt } satisfies SessionPayload)));
    const token = `${payload}.${bytesToBase64Url(await sign(payload, secret))}`;
    const secure = new URL(requestUrl).protocol === "https:" ? "; Secure" : "";
    return `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}${secure}`;
}

export function clearSessionCookie(requestUrl: string): string {
    const secure = new URL(requestUrl).protocol === "https:" ? "; Secure" : "";
    return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export async function getAuthenticatedAdmin(request: Request, env: AdminAuthEnv): Promise<string | null> {
    if (!env.ADMIN_SESSION_SECRET || env.ADMIN_SESSION_SECRET.length < 32) return null;
    const cookie = request.headers.get("Cookie")?.split(";").map((item) => item.trim())
        .find((item) => item.startsWith(`${ADMIN_SESSION_COOKIE}=`));
    const token = cookie?.slice(ADMIN_SESSION_COOKIE.length + 1);
    if (!token) return null;

    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return null;

    try {
        const expectedSignature = await sign(payload, env.ADMIN_SESSION_SECRET);
        if (!constantTimeEqual(expectedSignature, base64UrlToBytes(signature))) return null;
        const session = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as SessionPayload;
        if (!ADMIN_USERNAMES.includes(session.username as typeof ADMIN_USERNAMES[number])) return null;
        if (!Number.isInteger(session.version)
            || !Number.isInteger(session.expiresAt)
            || session.expiresAt <= Math.floor(Date.now() / 1000)) return null;

        const user = await env.DB.prepare(
            "SELECT session_version FROM admin_users WHERE username = ?",
        ).bind(session.username).first<{ session_version: number }>();
        return user?.session_version === session.version ? session.username : null;
    } catch {
        return null;
    }
}

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(value: string): Uint8Array {
    if (!/^(?:[0-9a-f]{2})+$/i.test(value)) return new Uint8Array();
    return Uint8Array.from(value.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16));
}

export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const hash = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: saltBytes, iterations: PASSWORD_ITERATIONS, hash: "SHA-256" },
        key,
        256,
    );
    return { salt: bytesToHex(saltBytes), hash: bytesToHex(new Uint8Array(hash)) };
}

export async function verifyPassword(password: string, salt: string, expectedHash: string): Promise<boolean> {
    const saltBytes = hexToBytes(salt);
    const expectedBytes = hexToBytes(expectedHash);
    if (saltBytes.length !== 16 || expectedBytes.length !== 32) return false;
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const saltBuffer = new Uint8Array(saltBytes).buffer as ArrayBuffer;
    const derived = new Uint8Array(await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: saltBuffer, iterations: PASSWORD_ITERATIONS, hash: "SHA-256" },
        key,
        256,
    ));
    return constantTimeEqual(derived, expectedBytes);
}

export function hasSameOrigin(request: Request): boolean {
    const origin = request.headers.get("Origin");
    if (!origin) return false;
    try {
        return new URL(origin).origin === new URL(request.url).origin;
    } catch {
        return false;
    }
}

export function jsonResponse(body: unknown, status = 200, headers?: HeadersInit): Response {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    responseHeaders.set("Cache-Control", "no-store");
    return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}
