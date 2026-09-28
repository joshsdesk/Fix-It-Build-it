import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminSearch from "../app/admin/search/page";

// Mock the Next.js Link component to avoid errors
vi.mock("next/link", () => {
    return {
        default: ({ children, href }: { children: React.ReactNode, href: string }) => {
            return <a href={href}>{children}</a>;
        }
    };
});

describe("AdminSearch UI", () => {
    let fetchSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        fetchSpy = vi.spyOn(global, "fetch");
        // Mock the initial auth check
        fetchSpy.mockResolvedValueOnce(new Response(null, { status: 200 }));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the search input and submit button", async () => {
        render(<AdminSearch />);
        const input = screen.getByPlaceholderText(/Search by exact Organization Name/i);
        const button = screen.getByRole("button", { name: /Verify Entity/i });
        
        expect(input).toBeDefined();
        expect(button).toBeDefined();
        expect(button.hasAttribute("disabled")).toBe(true); // disabled when empty
    });

    it("handles a successful search and renders results with badges", async () => {
        render(<AdminSearch />);
        
        const input = screen.getByPlaceholderText(/Search by exact Organization Name/i);
        const button = screen.getByRole("button", { name: /Verify Entity/i });
        
        fireEvent.change(input, { target: { value: "Soar Health Inc" } });
        expect(button.hasAttribute("disabled")).toBe(false);

        const mockResponse = {
            query: "Soar Health Inc",
            classification: "PROVIDER_NAME",
            verification: {
                nppes: {
                    status: "VERIFIED",
                    data: { npi: "1851057343", name: "SOAR HEALTH, INC.", status: "A" }
                },
                hcpf: {
                    status: "SOURCE_UNAVAILABLE"
                },
                sos: {
                    status: "VERIFIED",
                    data: { id: "20208104562", legalName: "Soar Health Inc.", status: "Good Standing" }
                }
            }
        };

        // The second fetch call will be the search request (first was auth check)
        fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(mockResponse), { status: 200 }));

        fireEvent.click(button);

        // Check for calm loading state
        expect(screen.getByText("Searching...")).toBeDefined();

        await waitFor(() => {
            expect(screen.getByText('Results for "Soar Health Inc"')).toBeDefined();
        });

        // Verify status badges
        const verifiedBadges = screen.getAllByText("VERIFIED");
        expect(verifiedBadges.length).toBe(2); // One for NPPES, one for SOS

        const unavailableBadges = screen.getAllByText("UNAVAILABLE");
        expect(unavailableBadges.length).toBe(1); // One for HCPF

        // Verify data rendered
        expect(screen.getByText("1851057343")).toBeDefined();
        expect(screen.getByText("20208104562")).toBeDefined();
    });

    it("handles an error search response", async () => {
        render(<AdminSearch />);
        
        const input = screen.getByPlaceholderText(/Search by exact Organization Name/i);
        const button = screen.getByRole("button", { name: /Verify Entity/i });
        
        fireEvent.change(input, { target: { value: "FailTest" } });

        fetchSpy.mockRejectedValueOnce(new Error("Network Error"));

        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText("Search Failed")).toBeDefined();
            expect(screen.getByText("Network error occurred.")).toBeDefined();
        });
    });

    it("handles NOT_FOUND and TIMEOUT responses correctly", async () => {
        render(<AdminSearch />);
        
        const input = screen.getByPlaceholderText(/Search by exact Organization Name/i);
        const button = screen.getByRole("button", { name: /Verify Entity/i });
        
        fireEvent.change(input, { target: { value: "Ghost Clinic" } });

        const mockResponse = {
            query: "Ghost Clinic",
            classification: "PROVIDER_NAME",
            verification: {
                nppes: { status: "NOT_FOUND" },
                hcpf: { status: "SOURCE_UNAVAILABLE" },
                sos: { status: "TIMEOUT" }
            }
        };

        fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(mockResponse), { status: 200 }));

        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Results for "Ghost Clinic"')).toBeDefined();
        });

        // NOT FOUND for NPPES
        expect(screen.getByText("NOT FOUND")).toBeDefined();
        expect(screen.getByText("No associated NPI data found.")).toBeDefined();

        // TIMEOUT for SOS
        expect(screen.getByText("TIMEOUT")).toBeDefined();
        expect(screen.getByText("No associated business entity found.")).toBeDefined();
    });

    it("redirects to login on 401 from search request", async () => {
        const originalLocation = window.location;
        const assignMock = vi.fn();
        delete (window as any).location;
        window.location = { ...originalLocation, assign: assignMock } as any;

        render(<AdminSearch />);
        
        const input = screen.getByPlaceholderText(/Search by exact Organization Name/i);
        const button = screen.getByRole("button", { name: /Verify Entity/i });
        
        fireEvent.change(input, { target: { value: "Soar Health Inc" } });

        fetchSpy.mockResolvedValueOnce(new Response(null, { status: 401 }));

        fireEvent.click(button);

        await waitFor(() => {
            expect(assignMock).toHaveBeenCalledWith("/admin/login");
        });

        window.location = originalLocation as any;
    });
});
