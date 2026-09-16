/// <reference types="@cloudflare/workers-types" />

interface Env {
    ADMIN_USERNAME?: string;
    ADMIN_PASSWORD?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const authHeader = request.headers.get("Authorization");

    // Fail closed: if credentials are not configured, deny all access.
    if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
        return new Response("Internal Server Error: Authentication Not Configured", {
            status: 500,
        });
    }

    const expectedAuth = `Basic ${btoa(`${env.ADMIN_USERNAME}:${env.ADMIN_PASSWORD}`)}`;

    if (!authHeader || authHeader !== expectedAuth) {
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        });
    }

    return context.next();
};
