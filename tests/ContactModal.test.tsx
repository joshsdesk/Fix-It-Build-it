import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactModal from "@/components/ContactModal";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("ContactModal", () => {
    it("shows the email service error and allows retrying", async () => {
        const user = userEvent.setup();
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(
            JSON.stringify({ success: false, error: "Email is not configured yet. Add RESEND_API_KEY." }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        )));
        render(<ContactModal isOpen onClose={vi.fn()} />);

        await user.type(screen.getByLabelText("Name"), "Taylor Example");
        await user.type(screen.getByLabelText("Email"), "taylor@example.com");
        await user.type(screen.getByLabelText("Phone"), "7205550100");
        await user.click(screen.getByRole("button", { name: "Send" }));

        expect(await screen.findByRole("alert")).toHaveTextContent("Add RESEND_API_KEY");
        await user.click(screen.getByRole("button", { name: "Try the form again" }));
        expect(screen.getByRole("heading", { name: "Send Us a Message" })).toBeInTheDocument();
    });

    it("shows confirmation after the email service accepts a message", async () => {
        const user = userEvent.setup();
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        )));
        render(<ContactModal isOpen onClose={vi.fn()} />);

        await user.type(screen.getByLabelText("Name"), "Taylor Example");
        await user.type(screen.getByLabelText("Email"), "taylor@example.com");
        await user.type(screen.getByLabelText("Phone"), "7205550100");
        await user.click(screen.getByRole("button", { name: "Send" }));

        expect(await screen.findByRole("heading", { name: "Request Submitted" })).toBeInTheDocument();
    });

    it("does not show consultation-duration choices", () => {
        render(<ContactModal isOpen onClose={vi.fn()} />);

        expect(screen.queryByText("30-min Video ($115)")).not.toBeInTheDocument();
        expect(screen.queryByText("60-min On-Site ($250)")).not.toBeInTheDocument();
    });
});
