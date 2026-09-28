import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ServicesSection from "@/components/layout/ServicesSection";

describe("ServicesSection calls to action", () => {
    it("scrolls to the sensory wizard and keeps consultation booking paused", () => {
        vi.stubGlobal("IntersectionObserver", class {
            observe() {}
            unobserve() {}
            disconnect() {}
        });
        const wizard = document.createElement("div");
        wizard.id = "estimator";
        wizard.scrollIntoView = vi.fn();
        document.body.appendChild(wizard);
        render(<ServicesSection />);

        fireEvent.click(screen.getByRole("button", { name: "Run the Smart Sensory Wizard" }));

        expect(wizard.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
        expect(screen.getByRole("button", { name: "In-Home Audits Temporarily Paused" })).toBeDisabled();
        wizard.remove();
    });
});
