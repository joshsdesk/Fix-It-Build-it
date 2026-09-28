import {
    clearSessionCookie,
    getAuthenticatedAdmin,
    hasSameOrigin,
    hashPassword,
    isConfigured,
    jsonResponse,
    verifyPassword,
    type AdminAuthEnv,
} from "../../_shared/admin-auth";

type Env = AdminAuthEnv;

interface PasswordRecord {
    password_salt: string;
    password_hash: string;
    session_version: number;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
    if (!hasSameOrigin(request)) return jsonResponse({ error: "Request origin rejected." }, 403);
    if (!isConfigured(env)) return jsonResponse({ error: "Admin settings are not configured." }, 503);

    const username = await getAuthenticatedAdmin(request, env);
    if (!username) return jsonResponse({ error: "Please sign in again." }, 401);

    let body: Record<string, unknown>;
    try {
        body = await request.json() as Record<string, unknown>;
    } catch {
        return jsonResponse({ error: "Invalid password change request." }, 400);
    }

    const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
    if (newPassword.length < 12 || newPassword.length > 256) {
        return jsonResponse({ error: "New password must be at least 12 characters." }, 400);
    }

    const record = await env.DB.prepare(
        "SELECT password_salt, password_hash, session_version FROM admin_users WHERE username = ?",
    ).bind(username).first<PasswordRecord>();
    if (!record || !(await verifyPassword(currentPassword, record.password_salt, record.password_hash))) {
        return jsonResponse({ error: "Current password is incorrect." }, 403);
    }
    if (currentPassword === newPassword) {
        return jsonResponse({ error: "Choose a password different from your current one." }, 400);
    }

    const replacement = await hashPassword(newPassword);
    const update = await env.DB.prepare(`
        UPDATE admin_users
        SET password_salt = ?, password_hash = ?, session_version = session_version + 1
        WHERE username = ? AND session_version = ?
    `).bind(replacement.salt, replacement.hash, username, record.session_version).run();

    if (update.meta.changes !== 1) return jsonResponse({ error: "Password changed elsewhere. Sign in again." }, 409);
    return jsonResponse({ success: true, message: "Password changed. Sign in again with your new password." }, 200, {
        "Set-Cookie": clearSessionCookie(request.url),
    });
}
