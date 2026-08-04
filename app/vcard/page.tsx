import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Josh Bourassa | Fix-It Build-It Colorado",
    robots: {
        index: false,
        follow: false,
    },
};

export default function VCardPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
            <div className="text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-fibi-accent">
                    Fix-It Build-It Colorado
                </p>
                <h1 className="text-3xl font-thin tracking-tight">
                    Digital Card <span className="font-normal text-gradient">Coming Soon</span>
                </h1>
            </div>
        </div>
    );
}
