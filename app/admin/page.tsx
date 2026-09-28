"use client";

import React, { useEffect, useState } from "react";
import { Database, ShieldCheck, Mail, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AdminLead {
    id: string;
    lead_name: string;
    lead_email: string;
    lead_phone: string;
    status: string;
    created_at: string;
}

interface AdminDashboardData {
    leads: AdminLead[];
    total: number;
    pending: number;
}

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        let active = true;
        fetch("/api/admin/leads", { cache: "no-store" })
            .then(async (response) => {
                if (response.status === 401) {
                    window.location.assign("/admin/login");
                    return null;
                }
                const result = await response.json() as AdminDashboardData & { error?: string };
                if (!response.ok) throw new Error(result.error || "Could not load admin data.");
                return result;
            })
            .then((result) => {
                if (active && result) setDashboardData(result);
            })
            .catch((error: unknown) => {
                if (active) setLoadError(error instanceof Error ? error.message : "Could not load admin data.");
            });
        return () => { active = false; };
    }, []);

    const statsData = [
        { label: "All Intake Leads", value: dashboardData?.total ?? "—", icon: Mail, color: "text-fibi-accent" },
        { label: "Pending Review", value: dashboardData?.pending ?? "—", icon: Database, color: "text-blue-400" },
        { label: "Recent Records", value: dashboardData?.leads.length ?? "—", icon: Users, color: "text-purple-400" },
        { label: "Security Status", value: dashboardData ? "ACTIVE" : "—", icon: ShieldCheck, color: "text-green-400" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="layout-container">
                <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tighter">FIBI <span className="text-fibi-accent">ADMIN</span></h1>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Lead Management v2.0</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-3 border border-white/10 px-4 py-3">
                            <div className={`h-2 w-2 rounded-full ${dashboardData ? "bg-green-500" : loadError ? "bg-red-500" : "bg-amber-400"}`} />
                            <span className="text-xs font-mono">{dashboardData ? "D1_CONNECTED" : loadError ? "D1_UNAVAILABLE" : "LOADING_D1"}</span>
                        </div>
                        <Link href="/admin/settings" className="min-h-12 inline-flex items-center rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">Admin settings</Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {statsData.map((stat) => (
                        <div key={stat.label} className="glass-card p-6 border-white/5 bg-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-white/5">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <span className="text-xs text-slate-500 font-bold">{dashboardData ? "CURRENT" : ""}</span>
                            </div>
                            <div className="text-3xl font-black">{stat.value}</div>
                            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <section className="glass-card border-white/5 overflow-hidden">
                    <div className="border-b border-white/5 bg-white/5 p-5 sm:p-6">
                        <h2 className="font-bold">Intake requests</h2>
                        <p className="mt-1 text-xs text-slate-400">Most recent 100 records from D1.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-widest">
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Email / Phone</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Received</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {dashboardData?.leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{lead.lead_name}</td>
                                        <td className="px-6 py-4 text-slate-400">{lead.lead_email}<br />{lead.lead_phone}</td>
                                        <td className="px-6 py-4 text-xs font-medium">{lead.status}</td>
                                        <td className="px-6 py-4 text-slate-400">{new Date(lead.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {dashboardData && dashboardData.leads.length === 0 && <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">No intake requests have arrived yet.</td></tr>}
                                {!dashboardData && !loadError && <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">Loading intake records...</td></tr>}
                                {loadError && <tr><td colSpan={4} role="alert" className="px-6 py-10 text-center text-red-300">{loadError}</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
