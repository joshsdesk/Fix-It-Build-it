interface Env {
  DB: D1Database;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const body = await request.json() as { source?: string };
    const source = body.source || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ipCountry = request.headers.get('cf-ipcountry') || 'unknown';

    const db = env.DB;

    // Create table if not exists (for local testing mostly, usually done in schema file)
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS nfc_taps (
        tap_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        source TEXT NOT NULL,
        source_app TEXT NOT NULL DEFAULT 'fibi-vcard',
        user_agent TEXT,
        ip_country TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `).run();

    await db.prepare(`
      INSERT INTO nfc_taps (source, user_agent, ip_country) 
      VALUES (?, ?, ?)
    `)
    .bind(source, userAgent, ipCountry)
    .run();
  } catch (error) {
    // Silently fail, don't break the page for analytics issues
    console.error("Failed to log NFC tap:", error);
  }

  return new Response(JSON.stringify({ status: 'logged' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
