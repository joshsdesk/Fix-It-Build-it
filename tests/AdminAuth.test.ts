import { describe, expect, it, vi } from "vitest";
import {
    createSessionCookie,
    getAuthenticatedAdmin,
    hashPassword,
    verifyPassword,
} from "@/functions/_shared/admin-auth";
import { onRequestPost as createAdminAccounts } from "@/functions/api/admin/setup";
import { onRequestPost as loginAdmin } from "@/functions/api/admin/login";
import { onRequestPost as changeAdminPassword } from "@/functions/api/admin/password";

const sessionSecret = "test-session-secret-that-is-long-enough-0000000000000000";

describe("admin auth primitives", () => {
    it("stores a salted password hash and verifies only the matching password", async () => {
        const stored = await hashPassword("fresh-password-for-test");

        expect(stored.salt).not.toBe("fresh-password-for-test");
        expect(await verifyPassword("fresh-password-for-test", stored.salt, stored.hash)).toBe(true);
        expect(await verifyPassword("different-password", stored.salt, stored.hash)).toBe(false);
    });

    it("accepts signed sessions only while their account version matches", async () => {
        const statement = {
            bind: vi.fn().mockReturnThis(),
            first: vi.fn().mockResolvedValue({ session_version: 4 }),
        };
        const env = {
            DB: { prepare: vi.fn().mockReturnValue(statement) } as unknown as D1Database,
            ADMIN_SESSION_SECRET: sessionSecret,
        };
        const cookie = await createSessionCookie("JoshsDesk", 4, sessionSecret, "https://example.com/admin");
        const request = new Request("https://example.com/admin", { headers: { Cookie: cookie.split(";")[0] } });

        expect(cookie).toContain("HttpOnly");
        expect(cookie).toContain("Secure");
        expect(await getAuthenticatedAdmin(request, env)).toBe("JoshsDesk");

        statement.first.mockResolvedValue({ session_version: 5 });
        expect(await getAuthenticatedAdmin(request, env)).toBeNull();
    });
});

describe("admin account setup", () => {
    it("creates both allowed accounts with hashes and never writes plaintext passwords", async () => {
        const setupToken = "one-time-bootstrap-token-long-enough-0000000000000000";
        const countStatement = {
            first: vi.fn().mockResolvedValue({ total: 0 }),
        };
        let insertedValues: unknown[] = [];
        const insertStatement = {
            bind: vi.fn((...values: unknown[]) => {
                insertedValues = values;
                return insertStatement;
            }),
            run: vi.fn().mockResolvedValue({ success: true }),
        };
        const env = {
            DB: {
                prepare: vi.fn((query: string) => query.includes("COUNT(*)") ? countStatement : insertStatement),
            } as unknown as D1Database,
            ADMIN_SESSION_SECRET: sessionSecret,
            ADMIN_BOOTSTRAP_TOKEN: setupToken,
        };
        const response = await createAdminAccounts({
            request: new Request("https://example.com/api/admin/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json", Origin: "https://example.com" },
                body: JSON.stringify({
                    bootstrapToken: setupToken,
                    accounts: [
                        { username: "JoshsDesk", password: "fresh-josh-password-123" },
                        { username: "MarysDesk", password: "fresh-mary-password-456" },
                    ],
                }),
            }),
            env,
        });

        expect(response.status).toBe(201);
        expect(insertedValues).toContain("JoshsDesk");
        expect(insertedValues).toContain("MarysDesk");
        expect(insertedValues).not.toContain("fresh-josh-password-123");
        expect(insertedValues).not.toContain("fresh-mary-password-456");
        expect(insertStatement.run).toHaveBeenCalledOnce();
    });

    it("rejects setup requests from another origin", async () => {
        const response = await createAdminAccounts({
            request: new Request("https://example.com/api/admin/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json", Origin: "https://attacker.example" },
                body: "{}",
            }),
            env: {
                DB: {} as D1Database,
                ADMIN_SESSION_SECRET: sessionSecret,
                ADMIN_BOOTSTRAP_TOKEN: "one-time-bootstrap-token-long-enough-0000000000000000",
            },
        });
        expect(response.status).toBe(403);
    });
});

describe("admin login and password changes", () => {
    it("sets an HttpOnly session cookie after a valid login", async () => {
        const password = "fresh-login-password-for-tests";
        const storedPassword = await hashPassword(password);
        const userStatement = {
            bind: vi.fn().mockReturnThis(),
            first: vi.fn().mockResolvedValue({
                password_salt: storedPassword.salt,
                password_hash: storedPassword.hash,
                session_version: 0,
            }),
        };
        const env = {
            DB: { prepare: vi.fn().mockReturnValue(userStatement) } as unknown as D1Database,
            ADMIN_SESSION_SECRET: sessionSecret,
        };

        const response = await loginAdmin({
            request: new Request("https://example.com/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", Origin: "https://example.com" },
                body: JSON.stringify({ username: "JoshsDesk", password }),
            }),
            env,
        });

        expect(response.status).toBe(200);
        expect(response.headers.get("Set-Cookie")).toContain("HttpOnly");
        expect(response.headers.get("Set-Cookie")).toContain("Secure");
        expect(await response.json()).toMatchObject({ success: true, username: "JoshsDesk" });
    });

    it("changes only the signed-in user's password and clears the old session", async () => {
        const oldPassword = "current-admin-password-for-test";
        const newPassword = "replacement-admin-password-test";
        const oldHash = await hashPassword(oldPassword);
        const versionStatement = {
            bind: vi.fn().mockReturnThis(),
            first: vi.fn().mockResolvedValue({ session_version: 3 }),
        };
        const passwordStatement = {
            bind: vi.fn().mockReturnThis(),
            first: vi.fn().mockResolvedValue({
                password_salt: oldHash.salt,
                password_hash: oldHash.hash,
                session_version: 3,
            }),
        };
        const updateStatement = {
            bind: vi.fn().mockReturnThis(),
            run: vi.fn().mockResolvedValue({ meta: { changes: 1 } }),
        };
        const env = {
            DB: {
                prepare: vi.fn((query: string) => {
                    if (query.includes("SELECT session_version")) return versionStatement;
                    if (query.includes("SELECT password_salt")) return passwordStatement;
                    return updateStatement;
                }),
            } as unknown as D1Database,
            ADMIN_SESSION_SECRET: sessionSecret,
        };
        const cookie = await createSessionCookie("MarysDesk", 3, sessionSecret, "https://example.com/admin");

        const response = await changeAdminPassword({
            request: new Request("https://example.com/api/admin/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Origin: "https://example.com",
                    Cookie: cookie.split(";")[0],
                },
                body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
            }),
            env,
        });

        expect(response.status).toBe(200);
        expect(response.headers.get("Set-Cookie")).toContain("Max-Age=0");
        expect(updateStatement.run).toHaveBeenCalledOnce();
        expect(updateStatement.bind.mock.calls[0]).not.toContain(newPassword);
    });
});
