import {
    ADMIN_USERNAMES,
    constantTimeStringEqual,
    hashPassword,
    hasSameOrigin,
    isConfigured,
    jsonResponse,
    type AdminAuthEnv,
} from "../../_shared/admin-auth";

type Env = AdminAuthEnv;

interface SetupAccount {
    username: string;
    password: string;
}

function isValidAccount(value: unknown, username: string): value is SetupAccount {
    if (!value || typeof value !== "object") return false;
    const account = value as Record<string, unknown>;
    return account.username === username
        && typeof account.password === "string"
        && account.password.length >= 12
        && account.password.length <= 256;
}

export async function onRequestGet({ env }: { env: Env }): Promise<Response> {
    if (!env.DB) return jsonResponse({ error: "Admin storage is not configured." }, 503);
    try {
        const result = await env.DB.prepare("SELECT COUNT(*) AS total FROM admin_users")
            .first<{ total: number }>();
        return jsonResponse({ setupRequired: (result?.total ?? 0) === 0 });
    } catch {
        return jsonResponse({ error: "Admin storage is not ready. Apply the admin database migration." }, 503);
    }
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
    if (!hasSameOrigin(request)) return jsonResponse({ error: "Request origin rejected." }, 403);
    if (!isConfigured(env) || !env.ADMIN_BOOTSTRAP_TOKEN || env.ADMIN_BOOTSTRAP_TOKEN.length < 32) {
        return jsonResponse({ error: "Admin setup is not configured." }, 503);
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json() as Record<string, unknown>;
    } catch {
        return jsonResponse({ error: "Invalid setup request." }, 400);
    }

    if (typeof body.bootstrapToken !== "string"
        || !constantTimeStringEqual(body.bootstrapToken, env.ADMIN_BOOTSTRAP_TOKEN)) {
        return jsonResponse({ error: "Setup token is incorrect." }, 403);
    }
    const accounts = body.accounts;
    if (!Array.isArray(accounts) || accounts.length !== 2
        || !isValidAccount(accounts[0], ADMIN_USERNAMES[0])
        || !isValidAccount(accounts[1], ADMIN_USERNAMES[1])
        || accounts[0].password === accounts[1].password) {
        return jsonResponse({ error: "Enter both required usernames with passwords of at least 12 characters." }, 400);
    }

    const existing = await env.DB.prepare("SELECT COUNT(*) AS total FROM admin_users")
        .first<{ total: number }>();
    if ((existing?.total ?? 0) !== 0) {
        return jsonResponse({ error: "Admin accounts have already been initialized." }, 409);
    }

    const [josh, mary] = await Promise.all([
        hashPassword(accounts[0].password),
        hashPassword(accounts[1].password),
    ]);
    const createdAt = new Date().toISOString();

    try {
        await env.DB.prepare(`
            INSERT INTO admin_users (username, password_salt, password_hash, session_version, created_at)
            VALUES (?, ?, ?, 0, ?), (?, ?, ?, 0, ?)
        `).bind(
            ADMIN_USERNAMES[0], josh.salt, josh.hash, createdAt,
            ADMIN_USERNAMES[1], mary.salt, mary.hash, createdAt,
        ).run();
    } catch {
        return jsonResponse({ error: "Setup has already completed. Try signing in." }, 409);
    }

    return jsonResponse({ success: true }, 201);
}
