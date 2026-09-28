import { getAuthenticatedAdmin, isConfigured, jsonResponse, type AdminAuthEnv } from "../../_shared/admin-auth";

type Env = AdminAuthEnv;

interface LeadRow {
    id: string;
    lead_name: string;
    lead_email: string;
    lead_phone: string;
    status: string;
    created_at: string;
}

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
    if (!isConfigured(env)) return jsonResponse({ error: "Admin dashboard is not configured." }, 503);
    if (!(await getAuthenticatedAdmin(request, env))) return jsonResponse({ error: "Please sign in again." }, 401);

    try {
        const [leadsResult, totalResult, pendingResult] = await Promise.all([
            env.DB.prepare(`
                SELECT id, lead_name, lead_email, lead_phone, status, created_at
                FROM staging_inbox
                ORDER BY created_at DESC
                LIMIT 100
            `).all<LeadRow>(),
            env.DB.prepare("SELECT COUNT(*) AS total FROM staging_inbox").first<{ total: number }>(),
            env.DB.prepare("SELECT COUNT(*) AS total FROM staging_inbox WHERE status = 'PENDING_REVIEW'")
                .first<{ total: number }>(),
        ]);

        return jsonResponse({
            leads: leadsResult.results,
            total: totalResult?.total ?? 0,
            pending: pendingResult?.total ?? 0,
        }, 200, { "Cache-Control": "private, no-store" });
    } catch {
        return jsonResponse({ error: "Could not load intake records from D1." }, 503);
    }
}
