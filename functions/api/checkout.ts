import Stripe from 'stripe';

export const onRequestPost: PagesFunction<{
    STRIPE_SECRET_KEY: string;
}> = async (context) => {
    try {
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
            apiVersion: '2026-08-26.dahlia',
        });

        const data = await context.request.json() as { amount?: number };

        // Default to $150.00 for the consultation
        const amount = data.amount || 15000; 

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return new Response(JSON.stringify({
            clientSecret: paymentIntent.client_secret,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: unknown) {
        console.error("Stripe error:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
};
