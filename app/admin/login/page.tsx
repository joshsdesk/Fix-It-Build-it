import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-white">
            <section className="w-full max-w-xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl sm:p-10">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-fibi-accent">Private workspace</p>
                <h1 className="mb-2 text-2xl font-bold">Admin sign in</h1>
                <p className="mb-8 text-sm text-slate-400">Sign in to the Fix-It Build-It admin dashboard.</p>
                <AdminLoginForm />
                <Link href="/" className="mt-8 inline-block text-sm text-slate-500 hover:text-white">Return to the public site</Link>
            </section>
        </main>
    );
}
