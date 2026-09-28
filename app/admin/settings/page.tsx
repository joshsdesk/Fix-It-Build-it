import Link from "next/link";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default function AdminSettingsPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-white">
            <section className="w-full max-w-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl sm:p-10">
                <Link href="/admin" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">Back to admin</Link>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-fibi-accent">Account settings</p>
                <h1 className="mb-2 text-2xl font-bold">Password and session</h1>
                <p className="mb-8 text-sm text-slate-400">Change the password for the signed-in desk. Changing it signs out existing sessions for that account.</p>
                <AdminSettingsForm />
            </section>
        </main>
    );
}
