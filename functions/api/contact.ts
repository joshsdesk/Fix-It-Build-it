interface Env {
    CLOUDFLARE_SECRET_KEY: string;
    EMAILJS_SERVICE_ID: string;
    EMAILJS_TEMPLATE_ID: string;
    EMAILJS_PUBLIC_KEY: string;
    EMAILJS_PRIVATE_KEY: string;
}

interface ContactRequestBody {
    token?: string;
    category?: "residential" | "commercial";
    name?: string;
    email?: string;
    phone?: string;
    projectType?: string;
    fundingType?: string;
    organization?: string;
    siteType?: string;
    hasLMN?: boolean;
    specs?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: unknown, status: number) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

// Verifies the Turnstile token server-side, then sends the lead via EmailJS's
// REST API using a private key — the client never talks to EmailJS directly,
// so a submission can't reach an inbox without passing the security check.
export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    try {
        const body: ContactRequestBody = await request.json();
        const { token, name, email } = body;

        if (!token) {
            return jsonResponse({ success: false, error: "Missing security token" }, 400);
        }
        if (!name?.trim() || !email?.trim() || !EMAIL_RE.test(email)) {
            return jsonResponse({ success: false, error: "Missing or invalid contact details" }, 400);
        }

        const ip = request.headers.get("CF-Connecting-IP") || "";

        const turnstileForm = new FormData();
        turnstileForm.append("secret", env.CLOUDFLARE_SECRET_KEY);
        turnstileForm.append("response", token);
        turnstileForm.append("remoteip", ip);

        const turnstileResult = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: turnstileForm,
        });
        const turnstileOutcome = (await turnstileResult.json()) as { success: boolean };

        if (!turnstileOutcome.success) {
            return jsonResponse({ success: false, error: "Security verification failed" }, 403);
        }

        const emailResult = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: env.EMAILJS_SERVICE_ID,
                template_id: env.EMAILJS_TEMPLATE_ID,
                user_id: env.EMAILJS_PUBLIC_KEY,
                accessToken: env.EMAILJS_PRIVATE_KEY,
                template_params: {
                    category: body.category === "commercial" ? "Commercial / Business" : "Residential / Family",
                    user_name: name,
                    user_email: email,
                    user_phone: body.phone || "",
                    organization: body.organization || "",
                    site_type: body.siteType || "",
                    project_type: body.projectType || "",
                    funding_type: body.fundingType || "",
                    has_lmn: body.hasLMN ? "Yes" : "No",
                    message: body.specs || "",
                },
            }),
        });

        if (!emailResult.ok) {
            const errText = await emailResult.text();
            console.error("EmailJS send failed:", emailResult.status, errText);
            return jsonResponse({ success: false, error: "Failed to send email" }, 502);
        }

        return jsonResponse({ success: true }, 200);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return jsonResponse({ success: false, error: errorMessage }, 500);
    }
};
