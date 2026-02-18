"use client";

import React from "react";
import { Hammer, FileText, ClipboardList } from "lucide-react";

export default function ZeroFailureContent() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-white">The "Zero-Failure" <span className="text-gradient">Content</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Standardized assets and protocols for consistent environmental implementation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Build Catalog */}
                    <div className="glass-card p-8 group hover:border-fibi-purple/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-fibi-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Hammer className="w-6 h-6 text-fibi-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Build Catalog</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fibi-accent" />
                                Sensory Bins & Stations
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fibi-accent" />
                                Focus Desks (Proprioceptive)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fibi-accent" />
                                Safety Nooks & Enclosures
                            </li>
                        </ul>
                    </div>

                    {/* Document Vault */}
                    <div className="glass-card p-8 group hover:border-fibi-purple/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-fibi-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-fibi-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Document Vault</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fibi-accent" />
                                <a href="#" className="hover:text-white transition-colors">Safety Material Certifications</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fibi-accent" />
                                <a href="#" className="hover:text-white transition-colors">LMN Templates (Medical Necessity)</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fibi-accent" />
                                <a href="#" className="hover:text-white transition-colors">Fire-Rated Specs</a>
                            </li>
                        </ul>
                    </div>

                    {/* Daily Log */}
                    <div className="glass-card p-8 group hover:border-fibi-purple/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-fibi-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ClipboardList className="w-6 h-6 text-fibi-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Daily Log</h3>
                        <div className="space-y-4">
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5">
                                <div className="text-xs text-fibi-accent font-mono mb-1">PROJECT STATUS</div>
                                <div className="text-sm text-white font-medium">Digital Boss_TODO Integration</div>
                                <div className="text-xs text-slate-500 mt-2">Real-time client updates active.</div>
                            </div>
                            <a href="#" className="text-xs text-fibi-purple hover:underline flex items-center gap-1">
                                View Live Log &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
