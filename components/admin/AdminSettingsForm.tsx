"use client";

import { useState, type FormEvent } from "react";

export default function AdminSettingsForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        if (newPassword !== confirmation) {
            setMessage("New password and confirmation do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/admin/password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const result = await response.json() as { error?: string; message?: string };
            if (!response.ok) {
                setMessage(result.error || "Password could not be changed.");
                return;
            }
            setCurrentPassword("");
            setNewPassword("");
            setConfirmation("");
            window.location.assign("/admin/login?passwordChanged=1");
        } catch {
            setMessage("Could not reach the password service. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
        } finally {
            window.location.assign("/admin/login");
        }
    };

    return (
        <div className="w-full max-w-lg space-y-8">
            <form onSubmit={handlePasswordChange} className="space-y-5 text-left">
                <label className="block space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Current password</span>
                    <input required type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                </label>
                <label className="block space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">New password</span>
                    <input required minLength={12} maxLength={256} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                </label>
                <label className="block space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Confirm new password</span>
                    <input required minLength={12} maxLength={256} type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                </label>
                {message && <p role="alert" className="text-sm text-red-300">{message}</p>}
                <button disabled={isSubmitting} type="submit" className="w-full rounded-md bg-fibi-purple px-5 py-3 font-semibold text-white disabled:opacity-50">
                    {isSubmitting ? "Changing password..." : "Change password"}
                </button>
            </form>
            <div className="border-t border-white/10 pt-6">
                <button type="button" onClick={handleLogout} className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">Sign out</button>
            </div>
        </div>
    );
}
