import {
    clearSessionCookie,
    getAuthenticatedAdmin,
    hasSameOrigin,
    isConfigured,
    jsonResponse,
    type AdminAuthEnv,
} from "../../_shared/admin-auth";

type Env = AdminAuthEnv;

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
    if (!hasSameOrigin(request)) return jsonResponse({ error: "Request origin rejected." }, 403);
    if (!isConfigured(env)) return jsonResponse({ error: "Admin login is not configured." }, 503);
    const username = await getAuthenticatedAdmin(request, env);
    if (!username) {
        return jsonResponse({ success: true }, 200, { "Set-Cookie": clearSessionCookie(request.url) });
    }

    await env.DB.prepare("UPDATE admin_users SET session_version = session_version + 1 WHERE username = ?")
        .bind(username).run();
    return jsonResponse({ success: true }, 200, { "Set-Cookie": clearSessionCookie(request.url) });
}
