"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { ArrowLeft, Search, Building2, CheckCircle2, XCircle, HelpCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface NormalizedNPPESRecord {
    npi: string;
    name: string;
    status: string;
    sourceUrl: string;
}

interface NormalizedSOSRecord {
    id: string;
    legalName: string;
    status: string;
    sourceUrl: string;
}

interface VerificationData<T> {
    status: "VERIFIED" | "UNVERIFIED" | "NOT_FOUND" | "ERROR" | "TIMEOUT" | "SOURCE_UNAVAILABLE";
    data?: T;
}

interface SearchResult {
    query: string;
    classification: string;
    verification: {
        nppes: VerificationData<NormalizedNPPESRecord>;
        hcpf: VerificationData<null>;
        sos: VerificationData<NormalizedSOSRecord>;
    };
    error?: string;
}

export default function AdminSearch() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SearchResult | null>(null);
    const [authError, setAuthError] = useState(false);

    // Initial auth check
    useEffect(() => {
        let active = true;
        fetch("/api/admin/leads", { cache: "no-store" })
            .then(res => {
                if (res.status === 401 && active) {
                    window.location.assign("/admin/login");
                }
            })
            .catch(() => {}); // ignore network errors for simple head check
        return () => { active = false; };
    }, []);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch(`/api/admin/search?query=${encodeURIComponent(query)}`);
            if (res.status === 401) {
                setAuthError(true);
                window.location.assign("/admin/login");
                return;
            }
            
            const data = await res.json() as SearchResult;
            if (!res.ok) {
                setResult({
                    query,
                    classification: "ERROR",
                    error: data.error || "Search failed.",
                    verification: {
                        nppes: { status: "ERROR" },
                        hcpf: { status: "ERROR" },
                        sos: { status: "ERROR" }
                    }
                });
            } else {
                setResult(data);
            }
        } catch (error) {
            setResult({
                query,
                classification: "ERROR",
                error: "Network error occurred.",
                verification: {
                    nppes: { status: "ERROR" },
                    hcpf: { status: "ERROR" },
                    sos: { status: "ERROR" }
                }
            });
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge = ({ status }: { status: "VERIFIED" | "UNVERIFIED" | "NOT_FOUND" | "ERROR" | "TIMEOUT" | "SOURCE_UNAVAILABLE" }) => {
        switch (status) {
            case "VERIFIED":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-green-500/10 text-green-400 border border-green-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED</span>;
            case "UNVERIFIED":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20"><AlertTriangle className="w-3.5 h-3.5" /> UNVERIFIED</span>;
            case "NOT_FOUND":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-slate-500/10 text-slate-400 border border-slate-500/20"><HelpCircle className="w-3.5 h-3.5" /> NOT FOUND</span>;
            case "ERROR":
            case "TIMEOUT":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-red-500/10 text-red-400 border border-red-500/20"><XCircle className="w-3.5 h-3.5" /> {status}</span>;
            case "SOURCE_UNAVAILABLE":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-transparent text-slate-500 border border-dashed border-slate-600"><AlertTriangle className="w-3.5 h-3.5" /> UNAVAILABLE</span>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="layout-container max-w-4xl">
                <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tighter">FIBI <span className="text-fibi-accent">SEARCH</span></h1>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Provider Verification Engine</p>
                        </div>
                    </div>
                </header>

                <section className="glass-card border-white/5 p-6 mb-8 relative overflow-hidden">
                    <form onSubmit={handleSearch} className="relative z-10 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search by exact Organization Name or 10-digit NPI..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full min-h-12 bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fibi-accent focus:border-transparent transition-all"
                                disabled={loading}
                                maxLength={100}
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading || !query.trim()}
                            className="min-h-12 px-8 bg-fibi-accent text-white font-semibold rounded-lg hover:bg-fibi-accent/90 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <span className={loading ? "animate-pulse" : ""}>{loading ? "Searching..." : "Verify Entity"}</span>
                        </button>
                    </form>
                    
                    {loading && (
                        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl pointer-events-none" />
                    )}
                </section>

                {authError && (
                    <div className="p-4 mb-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        Session expired. Redirecting to login...
                    </div>
                )}

                {result && !loading && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {result.error ? (
                            <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                <h3 className="font-bold mb-1">Search Failed</h3>
                                <p className="text-sm">{result.error}</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 px-2">
                                    <h2 className="text-lg font-bold">Results for &quot;{result.query}&quot;</h2>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded text-slate-300 font-mono">{result.classification}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* CMS NPPES Card */}
                                    <div className="glass-card border-white/5 p-6 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2 text-slate-300 font-medium">
                                                <Building2 className="w-4 h-4 text-blue-400" />
                                                CMS NPPES
                                            </div>
                                            <StatusBadge status={result.verification.nppes.status} />
                                        </div>
                                        <div className="flex-1 mt-2">
                                            {result.verification.nppes.data ? (
                                                <div className="space-y-3 text-sm">
                                                    <div>
                                                        <div className="text-slate-500 text-xs uppercase mb-0.5">NPI</div>
                                                        <div className="font-mono text-slate-200">{result.verification.nppes.data.npi}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-slate-500 text-xs uppercase mb-0.5">Provider Name</div>
                                                        <div className="font-medium text-slate-200">{result.verification.nppes.data.name}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-slate-500 italic">No associated NPI data found.</div>
                                            )}
                                        </div>
                                        {result.verification.nppes.data?.sourceUrl && (
                                            <div className="mt-6 pt-4 border-t border-white/5">
                                                <a href={result.verification.nppes.data.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View CMS Registry Record &rarr;</a>
                                            </div>
                                        )}
                                    </div>

                                    {/* CO SOS Card */}
                                    <div className="glass-card border-white/5 p-6 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2 text-slate-300 font-medium">
                                                <Building2 className="w-4 h-4 text-purple-400" />
                                                Colorado SOS
                                            </div>
                                            <StatusBadge status={result.verification.sos.status} />
                                        </div>
                                        <div className="flex-1 mt-2">
                                            {result.verification.sos.data ? (
                                                <div className="space-y-3 text-sm">
                                                    <div>
                                                        <div className="text-slate-500 text-xs uppercase mb-0.5">Entity ID</div>
                                                        <div className="font-mono text-slate-200">{result.verification.sos.data.id}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-slate-500 text-xs uppercase mb-0.5">Legal Name</div>
                                                        <div className="font-medium text-slate-200">{result.verification.sos.data.legalName}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-slate-500 italic">No associated business entity found.</div>
                                            )}
                                        </div>
                                        {result.verification.sos.data?.sourceUrl && (
                                            <div className="mt-6 pt-4 border-t border-white/5">
                                                <a href={result.verification.sos.data.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View SOS Record &rarr;</a>
                                            </div>
                                        )}
                                    </div>

                                    {/* HCPF Card */}
                                    <div className="glass-card border-white/5 p-6 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2 text-slate-300 font-medium">
                                                <Building2 className="w-4 h-4 text-teal-400" />
                                                HCPF Medicaid
                                            </div>
                                            <StatusBadge status={result.verification.hcpf.status} />
                                        </div>
                                        <div className="flex-1 mt-2">
                                            <div className="text-sm text-slate-500 italic">
                                                Medicaid provider lists are currently unlinked from automated verification.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
