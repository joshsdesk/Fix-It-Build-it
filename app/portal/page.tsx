"use client";

import React from "react";
import { ArrowLeft, FileText, Download, MessageSquare, CheckCircle2, Clock, Circle } from "lucide-react";
import Link from "next/link";

const PROJECT_TIMELINE = [
    { step: 1, label: "Consultation", status: "completed", date: "Oct 12" },
    { step: 2, label: "Design & PAR Approval", status: "completed", date: "Oct 18" },
    { step: 3, label: "Materials Ordered", status: "active", date: "In Progress" },
    { step: 4, label: "Installation", status: "pending", date: "TBD" },
    { step: 5, label: "Final Walkthrough", status: "pending", date: "TBD" },
];

const DOCUMENTS = [
    { id: 1, name: "Initial_Consultation_Summary.pdf", type: "Clinical Review", date: "Oct 12", size: "2.4 MB" },
    { id: 2, name: "Waiver_PAR_Justification.pdf", type: "Medicaid Docs", date: "Oct 15", size: "1.1 MB" },
    { id: 3, name: "Material_Invoice_001.pdf", type: "Receipt", date: "Oct 18", size: "450 KB" },
];

export default function ClientPortal() {
    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
            <div className="layout-container max-w-5xl mx-auto">
                
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors shrink-0">
                            <ArrowLeft className="w-6 h-6 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white">Client <span className="text-fibi-purple">Portal</span></h1>
                            <p className="text-sm text-slate-400 mt-1">Welcome back, Smith Family.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 glass-card px-4 py-2 hover:bg-white/10 transition-colors border-fibi-purple/20">
                            <MessageSquare className="w-4 h-4 text-fibi-purple" />
                            <span className="text-sm font-medium">Message Builder</span>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Column - Project Tracker */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass-card p-6 sm:p-8 border-white/5 bg-white/5 rounded-2xl">
                            <h2 className="text-xl font-bold text-white mb-6">Active Project Status</h2>
                            
                            <div className="relative">
                                {/* Vertical Track Line */}
                                <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-[2px] bg-white/10" />
                                
                                <div className="space-y-6">
                                    {PROJECT_TIMELINE.map((item, idx) => (
                                        <div key={idx} className="relative flex items-start gap-4 sm:gap-6 z-10">
                                            {/* Status Icon */}
                                            <div className="shrink-0 mt-0.5 bg-background">
                                                {item.status === 'completed' && <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-fibi-purple" />}
                                                {item.status === 'active' && (
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-fibi-accent flex items-center justify-center bg-background">
                                                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-fibi-accent animate-pulse" />
                                                    </div>
                                                )}
                                                {item.status === 'pending' && <Circle className="w-8 h-8 sm:w-10 sm:h-10 text-white/20" />}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className={`flex-1 ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                                <h3 className={`text-lg font-bold ${item.status === 'active' ? 'text-fibi-accent' : 'text-white'}`}>
                                                    {item.label}
                                                </h3>
                                                <p className="text-sm text-slate-400 mt-1">{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                        
                        <section className="glass-card p-6 sm:p-8 border-white/5 bg-white/5 rounded-2xl">
                            <h2 className="text-xl font-bold text-white mb-4">Project Overview</h2>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                <strong>Goal:</strong> Install ASPECTSS™ Safety Zoning and Deep Proprioceptive hardware in the basement play area.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We are currently awaiting the final shipment of the 1,000lb dynamic load joist mounts. Once they arrive, we will schedule the installation block.
                            </p>
                        </section>
                    </div>

                    {/* Sidebar - Document Vault */}
                    <div className="space-y-8">
                        <section className="glass-card p-6 border-white/5 bg-white/5 rounded-2xl">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-fibi-purple" />
                                Document Vault
                            </h2>
                            
                            <div className="space-y-4">
                                {DOCUMENTS.map((doc) => (
                                    <div key={doc.id} className="group p-4 rounded-xl border border-white/5 bg-black/20 hover:bg-white/5 hover:border-fibi-purple/30 transition-all">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-white truncate" title={doc.name}>
                                                    {doc.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-bold text-fibi-purple bg-fibi-purple/10 px-2 py-0.5 rounded-full">
                                                        {doc.type}
                                                    </span>
                                                    <span className="text-xs text-slate-500">{doc.size}</span>
                                                </div>
                                            </div>
                                            <button className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-fibi-purple group-hover:bg-fibi-purple/20 transition-colors shrink-0">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}
