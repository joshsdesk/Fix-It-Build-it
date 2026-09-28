CREATE TABLE IF NOT EXISTS admin_users (
    username TEXT PRIMARY KEY NOT NULL CHECK (username IN ('JoshsDesk', 'MarysDesk')),
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    session_version INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);
