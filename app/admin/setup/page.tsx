import Link from "next/link";
import AdminSetupForm from "@/components/admin/AdminSetupForm";

export default function AdminSetupPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-white">
            <section className="w-full max-w-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl sm:p-10">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-fibi-accent">One-time initialization</p>
                <h1 className="mb-2 text-2xl font-bold">Create admin logins</h1>
                <p className="mb-8 text-sm text-slate-400">Create the two desk accounts. Each password must be at least 12 characters and different from the other account&apos;s password.</p>
                <AdminSetupForm />
                <Link href="/admin/login" className="mt-8 inline-block text-sm text-slate-500 hover:text-white">Back to sign in</Link>
            </section>
        </main>
    );
}
