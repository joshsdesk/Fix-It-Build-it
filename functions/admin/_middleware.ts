/// <reference types="@cloudflare/workers-types" />
import { getAuthenticatedAdmin, isConfigured, type AdminAuthEnv } from "../_shared/admin-auth";

type Env = AdminAuthEnv;

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    if (pathname === "/admin/login" || pathname === "/admin/setup") {
        return context.next();
    }

    if (!isConfigured(env)) {
        return new Response("Admin authentication is not configured.", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
        });
    }

    const username = await getAuthenticatedAdmin(request, env);
    if (!username) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return Response.redirect(loginUrl, 302);
    }

    const response = await context.next();
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "private, no-store");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};
