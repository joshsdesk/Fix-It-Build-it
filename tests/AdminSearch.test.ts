import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { onRequestGet as searchAdmin } from "@/functions/api/admin/search";
import { createSessionCookie } from "@/functions/_shared/admin-auth";

const sessionSecret = "test-session-secret-that-is-long-enough-0000000000000000";

describe("admin search API", () => {
    const env = {
        DB: {
            prepare: vi.fn().mockReturnValue({
                bind: vi.fn().mockReturnThis(),
                first: vi.fn().mockResolvedValue({ session_version: 1 }),
            }),
        } as unknown as D1Database,
        ADMIN_SESSION_SECRET: sessionSecret,
    };

    it("rejects unauthenticated requests with 401", async () => {
        const response = await searchAdmin({
            request: new Request("https://example.com/api/admin/search?query=test"),
            env,
        });
        expect(response.status).toBe(401);
    });

    it("rejects empty queries with 400", async () => {
        const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
        const request = new Request("https://example.com/api/admin/search", {
            headers: { Cookie: cookie.split(";")[0] }
        });
        const response = await searchAdmin({ request, env });
        expect(response.status).toBe(400);
    });

    it("rejects oversized queries (>100 chars) with 400", async () => {
        const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
        const longQuery = "a".repeat(101);
        const request = new Request(`https://example.com/api/admin/search?query=${longQuery}`, {
            headers: { Cookie: cookie.split(";")[0] }
        });
        const response = await searchAdmin({ request, env });
        expect(response.status).toBe(400);
    });

    it("returns stable JSON shape for valid query", async () => {
        const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
        const request = new Request(`https://example.com/api/admin/search?query=test-query`, {
            headers: { Cookie: cookie.split(";")[0] }
        });
        const response = await searchAdmin({ request, env });
        expect(response.status).toBe(200);
        
        const data = await response.json();
        expect(data).toEqual({
            query: "test-query",
            classification: expect.any(String),
            providers: [],
            verification: expect.objectContaining({
                nppes: expect.any(Object),
                hcpf: expect.any(Object),
                sos: expect.any(Object)
            }),
            errors: []
        });
    });

    describe("external API mocking", () => {
        let fetchSpy: any;

        beforeEach(() => {
            fetchSpy = vi.spyOn(global, "fetch");
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("verifies Colorado SOS status directly for Soar Health, Inc. with mock", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=Soar+Health+Inc`, {
                headers: { Cookie: cookie.split(";")[0] }
            });

            // Mock NPPES first (returns empty)
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({ result_count: 0, results: [] }), { status: 200 }));
            // Mock the Socrata API response
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify([{
                entityid: "20208104562",
                entityname: "Soar Health Inc.",
                entitystatus: "Good Standing"
            }]), { status: 200 }));

            const response = await searchAdmin({ request, env });
            expect(response.status).toBe(200);
            
            const data = await response.json() as any;
            expect(data.query).toBe("Soar Health Inc");
            expect(data.classification).toBe("PROVIDER_NAME");
            
            // Assert the SOS entity record
            expect(data.verification.sos.status).toBe("VERIFIED");
            expect(data.verification.sos.data.legalName).toBe("Soar Health Inc.");
            expect(data.verification.sos.data.status).toBe("Good Standing");
            expect(data.verification.sos.data.id).toBe("20208104562");
            expect(data.verification.sos.data.sourceUrl).toContain("20208104562");

            // Assert the HCPF entity record
            expect(data.verification.hcpf.status).toBe("SOURCE_UNAVAILABLE");

            expect(fetchSpy).toHaveBeenCalledTimes(2);
            expect(fetchSpy.mock.calls[0][0]).toContain("npiregistry");
            expect(fetchSpy.mock.calls[1][0]).toContain("data.colorado.gov");
        });

        it("handles multiple matches deterministically for CO SOS", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=Multiple`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({ result_count: 0 }), { status: 200 })); // Mock NPPES first
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify([
                { entityid: "2", entityname: "Multiple Inc.", entitystatus: "Non-Compliant" },
                { entityid: "1", entityname: "Multiple Inc.", entitystatus: "Good Standing" }
            ]), { status: 200 }));

            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.sos.data.id).toBe("1"); // Prefers Good Standing
        });

        it("handles no match from CO SOS", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=Unknown`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({ result_count: 0 }), { status: 200 })); // NPPES
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 })); // SOS
            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.sos.status).toBe("NOT_FOUND");
        });

        it("handles non-200 response from CO SOS", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=Error`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({ result_count: 0 }), { status: 200 })); // NPPES
            fetchSpy.mockResolvedValueOnce(new Response("Internal Server Error", { status: 500 })); // SOS
            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.sos.status).toBe("ERROR");
            expect(data.verification.hcpf.status).toBe("SOURCE_UNAVAILABLE");
        });

        it("handles timeouts from all registries", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=Timeout`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockRejectedValue(Object.assign(new Error("The operation was aborted"), { name: "AbortError" }));
            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.sos.status).toBe("TIMEOUT");
            expect(data.verification.nppes.status).toBe("TIMEOUT");
            expect(data.verification.hcpf.status).toBe("SOURCE_UNAVAILABLE");
        });

        it("verifies NPPES NPI directly for Soar Health, Inc.", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=1851057343`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({
                result_count: 1,
                results: [{
                    number: "1851057343",
                    basic: {
                        organization_name: "SOAR HEALTH, INC.",
                        status: "A"
                    }
                }]
            }), { status: 200 }));
            // SOS won't trigger for NPI_LOOKUP, so no second mock needed

            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.classification).toBe("NPI_LOOKUP");
            expect(data.verification.nppes.status).toBe("VERIFIED");
            expect(data.verification.nppes.data.name).toBe("SOAR HEALTH, INC.");
            expect(data.verification.nppes.data.status).toBe("A");
            expect(data.verification.nppes.data.npi).toBe("1851057343");
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(fetchSpy.mock.calls[0][0]).toContain("npiregistry");
        });

        it("handles multiple matches deterministically for NPPES", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=Multiple+Providers`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({
                result_count: 2,
                results: [
                    { number: "2", basic: { organization_name: "Inactive", status: "I" } },
                    { number: "1", basic: { organization_name: "Active", status: "A" } }
                ]
            }), { status: 200 }));
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 })); // Mock SOS

            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.nppes.data.npi).toBe("1"); // Prefers Active status
        });

        it("handles no match from NPPES", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=1111111111`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({ result_count: 0, results: [] }), { status: 200 }));
            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.nppes.status).toBe("NOT_FOUND");
        });

        it("handles non-200 response from NPPES", async () => {
            const cookie = await createSessionCookie("JoshsDesk", 1, sessionSecret, "https://example.com/admin");
            const request = new Request(`https://example.com/api/admin/search?query=2222222222`, { headers: { Cookie: cookie.split(";")[0] } });
            
            fetchSpy.mockResolvedValueOnce(new Response("Internal Server Error", { status: 500 }));
            const response = await searchAdmin({ request, env });
            const data = await response.json() as any;
            expect(data.verification.nppes.status).toBe("ERROR");
        });
    });
});
