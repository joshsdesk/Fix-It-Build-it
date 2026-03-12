export const onRequestPost = async (context: { request: Request; env: { CLOUDFLARE_SECRET_KEY: string } }) => {
    const { request, env } = context;

    try {
        const body: { token?: string } = await request.json();
        const token = body.token;
        const ip = request.headers.get("CF-Connecting-IP") || "";

        if (!token) {
            return new Response(JSON.stringify({ success: false, error: "Missing token" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const formData = new FormData();
        formData.append("secret", env.CLOUDFLARE_SECRET_KEY);
        formData.append("response", token);
        formData.append("remoteip", ip);

        const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
        const result = await fetch(url, {
            body: formData,
            method: "POST",
        });

        const outcome = await result.json() as { success: boolean };

        if (outcome.success) {
            return new Response(JSON.stringify({ success: true }), {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: "Verification failed" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return new Response(JSON.stringify({ success: false, error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
