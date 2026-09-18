interface Env {
    TURNSTILE_SECRET_KEY: string;
    RESEND_API_KEY: string;
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

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const CONTACT_RECIPIENT = "FixitBuilditColorado@gmail.com";
const CONTACT_SENDER = "Fix-It Build-It <onboarding@resend.dev>";
const GENERIC_CLIENT_ERROR = "Unable to submit the form. Please try again.";
const SECURITY_ERROR = "Security verification failed.";

function jsonResponse(body: unknown, status: number) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

// Verifies the Turnstile token server-side, then sends the lead via Resend.
export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    try {
        const body: ContactRequestBody = await request.json();
        const { token, name, email } = body;

        if (!token || !name?.trim() || !email?.trim() || !EMAIL_RE.test(email)) {
            return jsonResponse({ success: false, error: GENERIC_CLIENT_ERROR }, 400);
        }

        const ip = request.headers.get("CF-Connecting-IP") || "";

        const turnstileForm = new FormData();
        turnstileForm.append("secret", env.TURNSTILE_SECRET_KEY);
        turnstileForm.append("response", token);
        turnstileForm.append("remoteip", ip);

        const turnstileResult = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: turnstileForm,
        });
        const turnstileOutcome = (await turnstileResult.json()) as { success: boolean; [key: string]: unknown };

        if (!turnstileResult.ok || !turnstileOutcome.success) {
            console.error("Turnstile verification failed:", {
                status: turnstileResult.status,
                outcome: turnstileOutcome,
            });
            return jsonResponse({ success: false, error: SECURITY_ERROR }, 400);
        }

        const emailResult = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: CONTACT_SENDER,
                to: [CONTACT_RECIPIENT],
                reply_to: email,
                subject: `Fix-It Build-It contact: ${body.category === "commercial" ? "Commercial / Business" : "Residential / Family"}`,
                text: [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${body.phone || ""}`,
                    `Category: ${body.category === "commercial" ? "Commercial / Business" : "Residential / Family"}`,
                    `Organization: ${body.organization || ""}`,
                    `Site Type: ${body.siteType || ""}`,
                    `Project Type: ${body.projectType || ""}`,
                    `Funding Type: ${body.fundingType || ""}`,
                    `Has LMN: ${body.hasLMN ? "Yes" : "No"}`,
                    "",
                    body.specs || "",
                ].join("\n"),
            }),
        });

        if (!emailResult.ok) {
            const errText = await emailResult.text();
            console.error("Resend send failed:", emailResult.status, errText);
            return jsonResponse({ success: false, error: GENERIC_CLIENT_ERROR }, 502);
        }

        return jsonResponse({ success: true }, 200);
    } catch (err: unknown) {
        console.error("Contact submission error:", err);
        return jsonResponse({ success: false, error: GENERIC_CLIENT_ERROR }, 500);
    }
};
