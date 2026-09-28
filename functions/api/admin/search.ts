import { getAuthenticatedAdmin, isConfigured, jsonResponse, type AdminAuthEnv } from "../../_shared/admin-auth";

type Env = AdminAuthEnv;

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
    if (!isConfigured(env)) return jsonResponse({ error: "Admin dashboard is not configured." }, 503);
    
    const adminUser = await getAuthenticatedAdmin(request, env);
    if (!adminUser) return jsonResponse({ error: "Please sign in again." }, 401);

    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.trim() ?? "";

    if (!query || query.length === 0 || query.length > 100) {
        return jsonResponse({ error: "Query must be between 1 and 100 characters." }, 400);
    }

    let classification = "GENERAL";
    if (/^\d{10}$/.test(query)) {
        classification = "NPI_LOOKUP";
    } else if (query.length > 2) {
        classification = "PROVIDER_NAME";
    }

    interface SocrataSOSEntity {
        entityid: string;
        entityname: string;
        entitystatus: string;
    }

    interface NormalizedSOSRecord {
        id: string;
        legalName: string;
        status: string;
        sourceUrl: string;
    }

    interface NPPESResult {
        number: string;
        basic: {
            organization_name?: string;
            first_name?: string;
            last_name?: string;
            status: string;
        };
    }

    interface NPPESResponse {
        result_count: number;
        results?: NPPESResult[];
    }

    interface NormalizedNPPESRecord {
        npi: string;
        name: string;
        status: string;
        sourceUrl: string;
    }

    const nppesPromise = (async () => {
        if (classification !== "NPI_LOOKUP" && classification !== "PROVIDER_NAME" && classification !== "GENERAL") {
            return { status: "UNVERIFIED", data: null as any };
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
            const nppesUrl = new URL("https://npiregistry.cms.hhs.gov/api/?version=2.1");
            if (classification === "NPI_LOOKUP") {
                nppesUrl.searchParams.set("number", query);
            } else {
                nppesUrl.searchParams.set("organization_name", query);
            }

            const nppesRes = await fetch(nppesUrl.toString(), { signal: controller.signal });
            clearTimeout(timeoutId);

            if (nppesRes.ok) {
                const data = await nppesRes.json() as NPPESResponse;
                if (data.results && data.results.length > 0) {
                    const record = data.results.sort((a, b) => {
                        const aActive = a.basic.status === "A" ? -1 : 1;
                        const bActive = b.basic.status === "A" ? -1 : 1;
                        if (aActive !== bActive) return aActive - bActive;
                        return a.number.localeCompare(b.number);
                    })[0];
                    
                    const orgName = record.basic.organization_name || `${record.basic.first_name} ${record.basic.last_name}`.trim();
                    return {
                        status: record.basic.status === "A" ? "VERIFIED" : "UNVERIFIED",
                        data: {
                            npi: record.number,
                            name: orgName,
                            status: record.basic.status,
                            sourceUrl: `https://npiregistry.cms.hhs.gov/provider-view/${record.number}`
                        } satisfies NormalizedNPPESRecord
                    };
                } else {
                    return { status: "NOT_FOUND", data: null as any };
                }
            } else {
                return { status: "ERROR", data: null as any };
            }
        } catch (e: any) {
            return { status: e.name === "AbortError" ? "TIMEOUT" : "ERROR", data: null as any };
        }
    })();

    const sosPromise = (async () => {
        if (classification !== "PROVIDER_NAME" && classification !== "GENERAL") {
            return { status: "UNVERIFIED", data: null as any };
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
            const sosUrl = new URL("https://data.colorado.gov/resource/4ykn-tg5h.json");
            const cleanedQuery = query.replace(/[,.]/g, "").trim();
            const escapedQuery = cleanedQuery.replace(/'/g, "''");
            sosUrl.searchParams.set("$where", `starts_with(upper(entityname), upper('${escapedQuery}'))`);
            sosUrl.searchParams.set("$limit", "1");

            const sosRes = await fetch(sosUrl.toString(), { signal: controller.signal });
            clearTimeout(timeoutId);

            if (sosRes.ok) {
                const data = await sosRes.json() as SocrataSOSEntity[];
                if (data && data.length > 0) {
                    const record = data.sort((a, b) => {
                        const aExact = a.entityname.toUpperCase() === query.toUpperCase() ? -1 : 1;
                        const bExact = b.entityname.toUpperCase() === query.toUpperCase() ? -1 : 1;
                        if (aExact !== bExact) return aExact - bExact;
                        
                        const aGood = a.entitystatus === "Good Standing" ? -1 : 1;
                        const bGood = b.entitystatus === "Good Standing" ? -1 : 1;
                        if (aGood !== bGood) return aGood - bGood;
                        
                        return a.entityid.localeCompare(b.entityid);
                    })[0];

                    return {
                        status: record.entitystatus === "Good Standing" ? "VERIFIED" : "UNVERIFIED",
                        data: {
                            id: record.entityid,
                            legalName: record.entityname,
                            status: record.entitystatus,
                            sourceUrl: `https://www.sos.state.co.us/biz/BusinessEntityDetail.do?quitButtonDestination=ReturnList&nameTyp=ENT&masterFileId=${record.entityid}`
                        } satisfies NormalizedSOSRecord
                    };
                } else {
                    return { status: "NOT_FOUND", data: null as any };
                }
            } else {
                return { status: "ERROR", data: null as any };
            }
        } catch (e: any) {
            return { status: e.name === "AbortError" ? "TIMEOUT" : "ERROR", data: null as any };
        }
    })();

    const [nppesResult, sosResult] = await Promise.all([nppesPromise, sosPromise]);

    const verification = {
        nppes: nppesResult,
        hcpf: { status: "SOURCE_UNAVAILABLE", data: null as any },
        sos: sosResult
    };

    const responseShape = {
        query,
        classification,
        providers: [],
        verification,
        errors: []
    };

    return jsonResponse(responseShape, 200, { "Cache-Control": "private, no-store" });
}
