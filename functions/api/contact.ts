import { z } from "zod";

interface Env {
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    RESEND_TO_EMAIL?: string;
}

const contactSchema = z.object({
    leadType: z.string().optional(),
    privatePaySession: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    contactMethod: z.string().optional(),
    propertyType: z.string().optional(),
    specs: z.string().optional(),
    caseManagerName: z.string().optional(),
    cmaAgency: z.string().optional(),
    waiverType: z.string().optional(),
}).catchall(z.unknown());

export async function onRequestPost(context: { request: Request; env: Env }) {
    try {
        const { request, env } = context;
        const data = await request.json();
        
        const parsed = contactSchema.safeParse(data);
        if (!parsed.success) {
            return Response.json({ success: false, error: "Invalid request payload" }, { status: 400 });
        }
        
        const { leadType, privatePaySession, name, phone, email, contactMethod, propertyType, specs, caseManagerName, cmaAgency, waiverType } = parsed.data;



        // 2. Format Structured Ledger Email
        const isMedicaid = leadType === "Health First Colorado Medicaid Waiver (CES/SLS)";
        
        let primaryEnergy = "N/A";
        let spatialGoals = "N/A";
        const projectScope = specs || "No message provided.";

        if (specs && specs.includes("Sensory Wizard results")) {
            const energyMatch = specs.match(/Energy: (.*?),/);
            const sensoryMatch = specs.match(/Sensory Profile: (.*?),/);
            const goalMatch = specs.match(/Build Goal: (.*?)\./);
            
            if (energyMatch) primaryEnergy = energyMatch[1];
            if (sensoryMatch && goalMatch) spatialGoals = `${sensoryMatch[1]} - ${goalMatch[1]}`;
        }

        const emailText = `
================================──────────────────────────────
🚨 NEW INTAKE LEAD / CONTACT REQUEST - FIX-IT BUILD-IT COLORADO
================================──────────────────────────────
• Timestamp: ${new Date().toISOString()}
• Lead Type: ${leadType === "Private Pay" && privatePaySession ? `Private Pay - ${privatePaySession}` : leadType || "General Contact"}
• Contact Name: ${name || "N/A"}
• Phone: ${phone || "N/A"}
• Email: ${email || "N/A"}
• Preferred Contact Method: ${contactMethod || "N/A"}
• Property Type: ${propertyType || "N/A"}

--- SENSORY WIZARD INTAKE SUMMARY ---
• Primary Energy Profile: ${primaryEnergy}
• Spatial Goals: ${spatialGoals}
• Project Scope / Message: ${projectScope}
${isMedicaid ? `
--- CMA / CASE MANAGER DETAILS (IF APPLICABLE) ---
• Case Manager Name: ${caseManagerName || "N/A"}
• CMA Agency: ${cmaAgency || "N/A"}
• Member Waiver Type: ${waiverType || "N/A"}
` : ''}
================================──────────────────────────────
`.trim();

        // 3. Dispatch Email via Resend
        if (!env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set. Failing request to prevent silent drop.");
            return Response.json({
                success: false,
                error: "Email is not configured yet. Add RESEND_API_KEY to the Cloudflare Pages environment.",
            }, { status: 500 });
        }

        const resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: env.RESEND_FROM_EMAIL || "Fix-It Build-It Intake <onboarding@resend.dev>",
                to: [env.RESEND_TO_EMAIL || "fixitbuilditcolorado@gmail.com"],
                reply_to: email,
                subject: `New Lead: ${name} - ${leadType}`,
                text: emailText,
            }),
        });

        if (!resendRes.ok) {
            const responseText = await resendRes.text();
            let providerMessage: string | undefined;
            try {
                const errorData = JSON.parse(responseText) as { message?: unknown };
                if (typeof errorData.message === "string") providerMessage = errorData.message;
            } catch {
                providerMessage = undefined;
            }
            console.error("Resend API error:", responseText);
            return Response.json({
                success: false,
                error: providerMessage
                    ? `Resend rejected the email: ${providerMessage.slice(0, 300)}`
                    : "Resend rejected the email. Check the API key, verified sender, and allowed recipient.",
            }, { status: 502 });
        }

        return Response.json({ success: true });
    } catch (error) {
        console.error("API route error:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
