import {
    ADMIN_USERNAMES,
    createSessionCookie,
    hasSameOrigin,
    isConfigured,
    jsonResponse,
    verifyPassword,
    type AdminAuthEnv,
} from "../../_shared/admin-auth";

type Env = AdminAuthEnv;

interface AdminUser {
    password_salt: string;
    password_hash: string;
    session_version: number;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
    if (!hasSameOrigin(request)) return jsonResponse({ error: "Request origin rejected." }, 403);
    if (!isConfigured(env)) return jsonResponse({ error: "Admin login is not configured." }, 503);

    let body: Record<string, unknown>;
    try {
        body = await request.json() as Record<string, unknown>;
    } catch {
        return jsonResponse({ error: "Invalid login request." }, 400);
    }

    const username = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" && body.password.length <= 256 ? body.password : "";
    const validUsername = ADMIN_USERNAMES.includes(username as typeof ADMIN_USERNAMES[number]);
    const user = validUsername
        ? await env.DB.prepare("SELECT password_salt, password_hash, session_version FROM admin_users WHERE username = ?")
            .bind(username).first<AdminUser>()
        : null;
    const salt = user?.password_salt ?? "00".repeat(16);
    const hash = user?.password_hash ?? "00".repeat(32);
    const passwordMatches = await verifyPassword(password, salt, hash);

    if (!validUsername || !user || !passwordMatches) {
        return jsonResponse({ error: "Username or password is incorrect." }, 401);
    }

    const cookie = await createSessionCookie(username, user.session_version, env.ADMIN_SESSION_SECRET!, request.url);
    return jsonResponse({ success: true, username }, 200, { "Set-Cookie": cookie });
}
