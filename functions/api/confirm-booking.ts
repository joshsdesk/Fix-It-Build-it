export const onRequestPost: PagesFunction<{
    CALCOM_API_KEY: string;
}> = async (context) => {
    try {
        const data = await context.request.json() as { bookingUid?: string; status?: string };
        const { bookingUid, status } = data;

        if (!bookingUid || status !== 'ACCEPTED') {
            return new Response(JSON.stringify({ error: "Invalid request parameters" }), { status: 400 });
        }

        if (context.env.CALCOM_API_KEY) {
            // PATCH to Cal.com API to officially accept the pending booking
            // This requires the booking ID (which we would lookup or pass from the frontend)
            // Note: The embed event gives `uid`, but the API often needs `id` or `uid` depending on the version.
            // Using v2 API or v1 PATCH /bookings/{id}
            
            // For now, this is the structural implementation to hit Cal.com
            const calResponse = await fetch(`https://api.cal.com/v1/bookings/${bookingUid}?apiKey=${context.env.CALCOM_API_KEY}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "ACCEPTED" })
            });

            if (!calResponse.ok) {
                console.error("Failed to confirm booking on Cal.com:", await calResponse.text());
                return new Response(JSON.stringify({ error: "Booking confirmation failed" }), { status: 502 });
            }
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error: unknown) {
        console.error("Confirm booking error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
