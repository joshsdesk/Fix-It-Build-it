CREATE TABLE IF NOT EXISTS staging_inbox (
    id TEXT PRIMARY KEY NOT NULL,
    lead_name TEXT NOT NULL,
    lead_email TEXT NOT NULL,
    lead_phone TEXT NOT NULL,
    r2_payload_key TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TEXT NOT NULL
);
