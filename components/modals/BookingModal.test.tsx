import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BookingModal from "./BookingModal";
import { vcardData } from "@/config/BusinessInfo";

describe("BookingModal", () => {
    it("offers direct contact when online scheduling is unavailable", () => {
        render(<BookingModal isOpen onClose={vi.fn()} bookingType="30min-video" />);

        expect(screen.getByRole("dialog")).toHaveAccessibleName("Arrange your 30-minute video consultation");
        expect(screen.getByText(/Online scheduling is temporarily unavailable/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Email Us/i })).toHaveAttribute("href", expect.stringContaining(`mailto:${vcardData.email}`));
        expect(screen.getByRole("link", { name: /Call Us/i })).toHaveAttribute("href", `tel:${vcardData.phone}`);
    });

    it("does not render while closed", () => {
        render(<BookingModal isOpen={false} onClose={vi.fn()} bookingType="60min-onsite" />);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
});
