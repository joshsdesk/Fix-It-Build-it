// Cloudflare Pages Function for POST /api/intake
import { drizzle } from 'drizzle-orm/d1';
import { stagingInbox } from '../../db/schema';
import { v4 as uuidv4 } from 'uuid';

export const onRequestPost: PagesFunction<{
  DB: D1Database;
  RAW_PAYLOADS: R2Bucket;
  TURNSTILE_SECRET_KEY: string;
  LISTMONK_WEBHOOK_URL: string;
}> = async (context) => {
  try {
    const data = await context.request.json() as Record<string, unknown>;
    const turnstileToken = data.turnstileToken;
    
    // 1. Validate Turnstile
    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return new Response(JSON.stringify({ error: "Missing verification token" }), { status: 400 });
    }
    
    const turnstileValidation = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${context.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });
    
    const turnstileResult = await turnstileValidation.json() as { success?: boolean };
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ error: "Verification failed" }), { status: 403 });
    }

    // 2. Check lightweight honeypot
    if (data.b_website_hp) {
      // Fake success for bots caught in the honeypot
      return new Response(JSON.stringify({ success: true, fake: true }), { status: 200 });
    }

    // 3. Prepare data
    const id = uuidv4();
    const payloadKey = `intakes/${id}.json`;
    
    const leadName = typeof data.leadName === "string" ? data.leadName : "";
    const leadEmail = typeof data.leadEmail === "string" ? data.leadEmail : "";
    const leadPhone = typeof data.leadPhone === "string" ? data.leadPhone : "";
    if (!leadName || !leadEmail || !leadPhone) {
      return new Response(JSON.stringify({ error: "Name, email, and phone are required" }), { status: 400 });
    }
    const rawWizardData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !["leadName", "leadEmail", "leadPhone", "turnstileToken", "b_website_hp"].includes(key))
    );

    // 4. Write full JSON payload to R2 bucket
    await context.env.RAW_PAYLOADS.put(payloadKey, JSON.stringify(rawWizardData), {
      httpMetadata: { contentType: 'application/json' }
    });

    // 5. Write metadata row to D1 Database
    const db = drizzle(context.env.DB);
    await db.insert(stagingInbox).values({
      id,
      leadName,
      leadEmail,
      leadPhone,
      r2PayloadKey: payloadKey,
      status: "PENDING_REVIEW",
      createdAt: new Date().toISOString(),
    });

    // 6. Fire-and-forget webhook to internal Listmonk Webhook route via ctx.waitUntil
    const requestUrl = new URL(context.request.url);
    const webhookUrl = `${requestUrl.origin}/api/listmonk-webhook`;
    
    context.waitUntil(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          origin: "sensory_wizard",
          lead_id: id,
          notes: typeof rawWizardData.notes === "string" ? rawWizardData.notes : ""
        })
      }).catch(err => console.error("Internal Webhook failed:", err))
    );

    return new Response(JSON.stringify({ success: true, id }), { status: 200 });

  } catch (error: unknown) {
    console.error("Intake error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
