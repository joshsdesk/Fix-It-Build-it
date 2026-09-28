"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function AdminLoginForm() {
    const [username, setUsername] = useState("JoshsDesk");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json() as { error?: string };
            if (!response.ok) {
                setError(result.error || "Unable to sign in.");
                return;
            }
            const requestedPath = new URLSearchParams(window.location.search).get("next");
            const nextPath = requestedPath?.startsWith("/admin")
                && !requestedPath.startsWith("/admin/login")
                && !requestedPath.startsWith("/admin/setup")
                ? requestedPath
                : "/admin";
            window.location.assign(nextPath);
        } catch {
            setError("Could not reach the sign-in service. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <label className="block space-y-2 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Desk login</span>
                <select value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent">
                    <option value="JoshsDesk">JoshsDesk</option>
                    <option value="MarysDesk">MarysDesk</option>
                </select>
            </label>
            <label className="block space-y-2 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Password</span>
                <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
            </label>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <button disabled={isSubmitting} type="submit" className="w-full rounded-md bg-fibi-purple px-5 py-3 font-semibold text-white disabled:opacity-50">
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
            <p className="text-center text-sm text-slate-400">First-time setup? <Link href="/admin/setup" className="text-fibi-accent underline">Initialize admin logins</Link></p>
        </form>
    );
}
