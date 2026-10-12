import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ServicesSection from "@/components/layout/ServicesSection";

describe("ServicesSection", () => {
    it("renders the services section", () => {
        vi.stubGlobal("IntersectionObserver", class {
            observe() {}
            unobserve() {}
            disconnect() {}
        });
        render(<ServicesSection />);
        expect(screen.getByText(/Sensory Home Adaptations/i)).toBeInTheDocument();
    });
});
