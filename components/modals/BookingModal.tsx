"use client";

import { X, Mail, Phone } from "lucide-react";
import { vcardData } from "@/config/BusinessInfo";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingType: "30min-video" | "60min-onsite";
}

export default function BookingModal({ isOpen, onClose, bookingType }: BookingModalProps) {
    if (!isOpen) return null;

    const appointmentType = bookingType === "30min-video" ? "30-minute video consultation" : "60-minute on-site audit";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-modal-title"
                className="relative w-full max-w-lg rounded-xl border border-white/10 bg-background p-6 text-center shadow-2xl sm:p-8"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close modal"
                >
                    <X className="h-6 w-6" />
                </button>
                <h2 id="booking-modal-title" className="mb-3 pr-8 text-xl font-bold text-white">
                    Arrange your {appointmentType}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">
                    Online scheduling is temporarily unavailable. Contact us directly and we&apos;ll help arrange a time.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                        href={`mailto:${vcardData.email}?subject=${encodeURIComponent(`Booking request: ${appointmentType}`)}`}
                        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-fibi-purple px-4 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
                    >
                        <Mail className="h-4 w-4" /> Email Us
                    </a>
                    <a
                        href={`tel:${vcardData.phone}`}
                        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-fibi-purple px-4 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
                    >
                        <Phone className="h-4 w-4" /> Call Us
                    </a>
                </div>
            </section>
        </div>
    );
}
