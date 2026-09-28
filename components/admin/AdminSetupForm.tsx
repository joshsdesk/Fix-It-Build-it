"use client";

import { useEffect, useState, type FormEvent } from "react";

interface SetupStatus {
    setupRequired?: boolean;
    error?: string;
}

export default function AdminSetupForm() {
    const [status, setStatus] = useState<"checking" | "ready" | "complete" | "error">("checking");
    const [bootstrapToken, setBootstrapToken] = useState("");
    const [joshPassword, setJoshPassword] = useState("");
    const [joshConfirmation, setJoshConfirmation] = useState("");
    const [maryPassword, setMaryPassword] = useState("");
    const [maryConfirmation, setMaryConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let active = true;
        fetch("/api/admin/setup", { cache: "no-store" })
            .then(async (response) => ({ response, result: await response.json() as SetupStatus }))
            .then(({ response, result }) => {
                if (!active) return;
                if (!response.ok) {
                    setMessage(result.error || "Unable to check setup status.");
                    setStatus("error");
                } else {
                    setStatus(result.setupRequired ? "ready" : "complete");
                }
            })
            .catch(() => {
                if (active) {
                    setMessage("Could not reach the admin setup service.");
                    setStatus("error");
                }
            });
        return () => { active = false; };
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        if (joshPassword !== joshConfirmation || maryPassword !== maryConfirmation) {
            setMessage("Each password and its confirmation must match.");
            return;
        }
        if (joshPassword === maryPassword) {
            setMessage("Choose a different password for each login.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/admin/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bootstrapToken,
                    accounts: [
                        { username: "JoshsDesk", password: joshPassword },
                        { username: "MarysDesk", password: maryPassword },
                    ],
                }),
            });
            const result = await response.json() as SetupStatus;
            if (!response.ok) {
                setMessage(result.error || "Account setup failed.");
                return;
            }
            setStatus("complete");
            setMessage("Both logins are ready. Sign in with your new passwords.");
            setBootstrapToken("");
            setJoshPassword("");
            setJoshConfirmation("");
            setMaryPassword("");
            setMaryConfirmation("");
        } catch {
            setMessage("Could not reach the admin setup service.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "checking") return <p role="status" className="text-sm text-slate-400">Checking admin setup...</p>;
    if (status === "complete") return <div className="space-y-4 text-center"><p role="status" className="text-sm text-emerald-300">{message || "Admin accounts already exist."}</p><a href="/admin/login" className="inline-flex min-h-12 items-center rounded-md bg-fibi-purple px-5 py-3 font-semibold text-white">Go to sign in</a></div>;
    if (status === "error") return <p role="alert" className="text-sm text-red-300">{message}</p>;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 text-left">
            <label className="block space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">One-time setup token</span>
                <input required type="password" value={bootstrapToken} onChange={(event) => setBootstrapToken(event.target.value)} autoComplete="off" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
                <fieldset className="space-y-3">
                    <legend className="mb-2 font-bold text-white">JoshsDesk</legend>
                    <input aria-label="JoshsDesk password" required minLength={12} maxLength={256} type="password" value={joshPassword} onChange={(event) => setJoshPassword(event.target.value)} autoComplete="new-password" placeholder="New password (12+ characters)" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                    <input aria-label="Confirm JoshsDesk password" required minLength={12} maxLength={256} type="password" value={joshConfirmation} onChange={(event) => setJoshConfirmation(event.target.value)} autoComplete="new-password" placeholder="Confirm password" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                </fieldset>
                <fieldset className="space-y-3">
                    <legend className="mb-2 font-bold text-white">MarysDesk</legend>
                    <input aria-label="MarysDesk password" required minLength={12} maxLength={256} type="password" value={maryPassword} onChange={(event) => setMaryPassword(event.target.value)} autoComplete="new-password" placeholder="New password (12+ characters)" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                    <input aria-label="Confirm MarysDesk password" required minLength={12} maxLength={256} type="password" value={maryConfirmation} onChange={(event) => setMaryConfirmation(event.target.value)} autoComplete="new-password" placeholder="Confirm password" className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent" />
                </fieldset>
            </div>
            {message && <p role="alert" className="text-sm text-red-300">{message}</p>}
            <button disabled={isSubmitting} type="submit" className="w-full rounded-md bg-fibi-purple px-5 py-3 font-semibold text-white disabled:opacity-50">
                {isSubmitting ? "Creating logins..." : "Create both logins"}
            </button>
        </form>
    );
}
