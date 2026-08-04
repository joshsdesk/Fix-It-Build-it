interface Env {
    EMAILJS_SERVICE_ID: string;
    EMAILJS_TEMPLATE_ID: string;
    EMAILJS_PUBLIC_KEY: string;
    EMAILJS_PRIVATE_KEY: string;
}

interface ContactRequestBody {
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

// Sends the lead via EmailJS's REST API using a private key, so the client
// never talks to EmailJS directly and the key never reaches the browser.
export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    try {
        const body: ContactRequestBody = await request.json();
        const { name, email } = body;

        if (!name?.trim() || !email?.trim() || !EMAIL_RE.test(email)) {
            return jsonResponse({ success: false, error: "Missing or invalid contact details" }, 400);
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
