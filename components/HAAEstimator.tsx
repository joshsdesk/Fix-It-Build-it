"use client";

import React, { useState } from "react";
import { Calculator, Info } from "lucide-react";

const LABOR_RATE = 85;

const SERVICE_RATES: Record<string, { material_base: number; labor_hours: number }> = {
    'Sensory Installations': { material_base: 800, labor_hours: 20 },
    'Adaptive Safety': { material_base: 300, labor_hours: 8 },
    'Specialized Storage': { material_base: 200, labor_hours: 5 },
    'Technical Consultation': { material_base: 0, labor_hours: 2 }
};

export default function HAAEstimator() {
    const [project, setProject] = useState('Sensory Installations');

    const calculateEstimate = () => {
        const item = SERVICE_RATES[project];
        const laborCost = item.labor_hours * LABOR_RATE;
        const materialCost = item.material_base;
        const total = laborCost + materialCost;
        return { total, laborCost, materialCost };
    };

    const { total, laborCost, materialCost } = calculateEstimate();

    return (
        <section id="estimator" className="py-24 bg-background">
            <div className="max-w-md mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Quick <span className="text-gradient">Estimator</span></h2>
                    <p className="text-slate-400 text-sm">Labor Rate: ${LABOR_RATE}/hr + Material Cost</p>
                </div>

                <div className="glass-card relative p-8 group overflow-hidden">
                    <label className="block mb-3 text-sm font-bold text-fibi-accent uppercase tracking-wider relative z-10">Select Project Type</label>
                    <div className="relative mb-8 z-10">
                        <select
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-fibi-accent appearance-none cursor-pointer hover:bg-slate-900/80 transition-colors"
                        >
                            {Object.keys(SERVICE_RATES).map(key => (
                                <option key={key} value={key} className="bg-slate-900">{key}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-slate-900/80 p-6 rounded-xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-fibi-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Estimated Cost</span>
                            <span className="text-4xl font-black text-white tracking-tight">${total}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex justify-end gap-2 font-mono">
                            <span>Labor: ${laborCost}</span>
                            <span className="text-white/20">|</span>
                            <span>Materials: ${materialCost}</span>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 text-[10px] text-fibi-accent/80 font-medium bg-fibi-accent/10 px-2 py-1 rounded w-full justify-center">
                            <Info className="w-3 h-3" />
                            Non-structural estimate
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                        Request Installation Quote <Calculator className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section >
    );
}
