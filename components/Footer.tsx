"use client";

import React from "react";

export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl tracking-[0.2em] uppercase font-thin text-white leading-none">
                                FIX-IT
                            </span>
                            <span className="text-2xl tracking-[0.2em] uppercase font-normal text-fibi-accent leading-none">
                                BUILD-IT
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs mb-4">
                            Independent Carpenter in Colorado. Specialist in Home Accessibility Adaptations.
                        </p>
                        <div className="flex flex-col gap-1 text-xs text-slate-500">
                            <a href="tel:7205153348" className="hover:text-fibi-accent italic transition-colors">720-515-3348</a>
                            <a href="mailto:FixItBuildItColorado@gmail.com" className="hover:text-fibi-accent italic transition-colors">FixItBuildItColorado@gmail.com</a>
                        </div>
                    </div>

                    <div className="flex gap-8 text-sm text-slate-400 font-medium">
                        <a href="#" className="hover:text-fibi-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-fibi-accent transition-colors">Terms</a>
                        <a href="#" className="hover:text-fibi-accent transition-colors">Waiver Access</a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <p className="text-xs text-slate-600">
                        © 2026 Fix-It Build-It Colorado LLC. All Rights Reserved.
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest max-w-sm text-center md:text-right">
                        All work is non-structural and specialty-focused. Independent Carpenter specializing in HAA modules.
                    </p>
                </div>
            </div>
        </footer>
    );
}
