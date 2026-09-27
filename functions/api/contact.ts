interface Env {
    RESEND_API_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
    try {
        const { request, env } = context;
        const data = await request.json() as Record<string, unknown>;
        const { leadType, privatePaySession, name, phone, email, contactMethod, propertyType, specs, caseManagerName, cmaAgency, waiverType } = data as Record<string, string>;



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
• Lead Type: ${leadType === "Private Pay" ? `Private Pay - ${privatePaySession}` : leadType || "Private Pay"}
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
        if (env.RESEND_API_KEY) {
            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Fix-It Build-It Intake <onboarding@resend.dev>",
                    to: ["FixitBuilditColorado@gmail.com"],
                    subject: `New Lead: ${name} - ${leadType}`,
                    text: emailText,
                }),
            });

            if (!resendRes.ok) {
                const errorData = await resendRes.json();
                console.error("Resend API error:", errorData);
                return Response.json({ success: false, error: "Failed to dispatch email" }, { status: 500 });
            }
        } else {
            console.error("RESEND_API_KEY is not set. Failing request to prevent silent drop.");
            return Response.json({ success: false, error: "Email provider configuration missing" }, { status: 500 });
        }

        return Response.json({ success: true });
    } catch (error) {
        console.error("API route error:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
