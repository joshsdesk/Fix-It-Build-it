export const onRequestPost: PagesFunction<{
    LISTMONK_WEBHOOK_URL: string;
}> = async (context) => {
    try {
        const payload = await context.request.json() as Record<string, unknown>;
        const origin = typeof payload.origin === "string" ? payload.origin : "sensory_wizard";

        let tags: string[] = [];
        if (origin === "sensory_wizard") {
            tags = ["FIBI_Contractor", "Sensory_Wizard", "HAA_Adaptive"];
        } else if (origin === "private_pay") {
            tags = ["Private_Pay_Consult", "CalCom_Booked"];
        } else if (origin === "unmet_needs") {
            tags = ["Unmet_Needs_Pending", "CMA_Verification"];
        }

        if (context.env.LISTMONK_WEBHOOK_URL) {
            await fetch(context.env.LISTMONK_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Source-Origin": "fibi-edge-webhook"
                },
                body: JSON.stringify({
                    name: payload.name,
                    email: payload.email,
                    tags: tags,
                    attribs: {
                        source: origin,
                        lead_id: payload.lead_id,
                        notes: typeof payload.notes === "string" ? payload.notes : ""
                    }
                })
            });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: unknown) {
        console.error("Listmonk webhook error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
