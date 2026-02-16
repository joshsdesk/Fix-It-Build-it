"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, ShieldCheck, Mail, Users, ArrowLeft, Scroll } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tighter">FIBI <span className="text-fibi-accent">ADMIN</span></h1>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Lead Management v2.0</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 glass-card px-4 py-2 border-fibi-accent/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-mono">D1_DB_CONNECTED</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Active Leads", value: "12", icon: Mail, color: "text-fibi-accent" },
                        { label: "Pending Quotes", value: "05", icon: Database, color: "text-blue-400" },
                        { label: "Consults", value: "08", icon: Users, color: "text-purple-400" },
                        { label: "Security Status", value: "STABLE", icon: ShieldCheck, color: "text-green-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="glass-card p-6 border-white/5 bg-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-white/5">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <span className="text-xs text-slate-500 font-bold">LIVE</span>
                            </div>
                            <div className="text-3xl font-black">{stat.value}</div>
                            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column: Lead Table (Spans 2 cols) */}
                    <div className="lg:col-span-2 glass-card border-white/5 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <h3 className="font-bold">Active Inbound Manifests</h3>
                            <button className="text-xs text-fibi-accent font-bold hover:underline">Export CSV</button>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-widest">
                                        <th className="px-6 py-4">Client</th>
                                        <th className="px-6 py-4">Project</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { name: "Family_A", project: "Sensory Pod", status: "New" },
                                        { name: "Family_B", project: "Safety Gates", status: "Vetted" },
                                        { name: "Family_C", project: "Mounting", status: "Consult scheduled" },
                                        { name: "Family_D", project: "Visual Hub", status: "On Hold" },
                                        { name: "Family_E", project: "Full Install", status: "New" },
                                    ].map((lead) => (
                                        <tr key={lead.name} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 font-medium">{lead.name}</td>
                                            <td className="px-6 py-4 text-slate-400">{lead.project}</td>
                                            <td className="px-6 py-4 text-xs font-medium">{lead.status}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-500 group-hover:text-fibi-accent transition-colors">Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Material Price Inputs */}
                    <div className="glass-card border-white/5 p-6 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-6 text-fibi-accent">
                            <Database className="w-5 h-5" />
                            <h3 className="font-bold">Material Cost Index</h3>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">Live update base material rates for the public Estimator.</p>

                        <div className="space-y-4 flex-1">
                            {[
                                { label: "Lumber (2x4)", price: "4.50" },
                                { label: "Plywood (3/4)", price: "45.00" },
                                { label: "Sensory Foam", price: "220.00" },
                                { label: "Acrylic Sheets", price: "85.00" },
                                { label: "Hardware Kit", price: "35.00" },
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between items-center group">
                                    <label className="text-sm text-slate-400 group-hover:text-white transition-colors">{item.label}</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-600">$</span>
                                        <input
                                            type="text"
                                            defaultValue={item.price}
                                            className="w-20 bg-slate-900 border border-white/10 rounded px-2 py-1 text-right text-sm focus:border-fibi-accent outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <button className="btn-primary w-full text-sm py-2">Update Global Rates</button>
                        </div>
                    </div>
                </div>

                {/* Quote Generator Section */}
                <div className="glass-card border-white/5 p-8 mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Scroll className="w-5 h-5 text-fibi-accent" />
                            Rapid Quote Generator
                        </h3>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold border border-white/10 px-3 py-1 rounded-full">
                            Internal Use Only
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Client Details</label>
                            <input type="text" placeholder="Client Name" className="w-full bg-slate-900 border border-white/10 rounded px-4 py-2 text-sm focus:border-fibi-accent outline-none" />
                            <input type="text" placeholder="Project Address" className="w-full bg-slate-900 border border-white/10 rounded px-4 py-2 text-sm focus:border-fibi-accent outline-none" />
                            <select className="w-full bg-slate-900 border border-white/10 rounded px-4 py-2 text-sm focus:border-fibi-accent outline-none text-slate-400">
                                <option>Select Funding Source...</option>
                                <option>Private Pay</option>
                                <option>CES Waiver</option>
                                <option>SLS Waiver</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Line Items</label>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Item Description" className="flex-1 bg-slate-900 border border-white/10 rounded px-3 py-2 text-sm outline-none" />
                                    <input type="text" placeholder="$0.00" className="w-24 bg-slate-900 border border-white/10 rounded px-3 py-2 text-sm text-right outline-none" />
                                </div>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Item Description" className="flex-1 bg-slate-900 border border-white/10 rounded px-3 py-2 text-sm outline-none" />
                                    <input type="text" placeholder="$0.00" className="w-24 bg-slate-900 border border-white/10 rounded px-3 py-2 text-sm text-right outline-none" />
                                </div>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Labor Hours" className="flex-1 bg-slate-900 border border-white/10 rounded px-3 py-2 text-sm outline-none" />
                                    <input type="text" placeholder="$0.00" className="w-24 bg-slate-900 border border-white/10 rounded px-3 py-2 text-sm text-right outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-white mb-4">Quote Preview</h4>
                                <div className="text-xs text-slate-400 space-y-1 mb-6">
                                    <p>• Valid for 7 Days</p>
                                    <p>• Non-Structural Disclaimer Included</p>
                                    <p>• HAA Specialist Certified</p>
                                </div>
                            </div>
                            <button className="btn-primary w-full text-sm">Generate PDF Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
