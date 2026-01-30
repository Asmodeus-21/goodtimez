import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
});

// Stripe configuration
export const STRIPE_CONFIG = {
    currency: "usd",
    paymentMethodTypes: ["card"],

    // Platform commission (20% default)
    platformCommissionRate: 0.20,

    // Subscription plans
    subscriptionPlans: {
        creator: {
            monthly: {
                priceId: "price_creator_monthly",
                amount: 999, // $9.99
            },
            yearly: {
                priceId: "price_creator_yearly",
                amount: 9999, // $99.99
            },
        },
    },

    // Token packages for fans
    tokenPackages: [
        { tokens: 100, price: 999, priceId: "price_tokens_100" },
        { tokens: 500, price: 4999, priceId: "price_tokens_500" },
        { tokens: 1000, price: 9999, priceId: "price_tokens_1000" },
        { tokens: 5000, price: 49999, priceId: "price_tokens_5000" },
    ],
};

// Helper functions
export async function createStripeCustomer(userId: string, email: string, name: string) {
    const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
            userId,
        },
    });

    return customer;
}

export async function createPaymentIntent(
    amount: number,
    currency: string = "usd",
    customerId?: string
) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return paymentIntent;
}

export async function createSubscription(
    customerId: string,
    priceId: string,
    metadata?: Record<string, string>
) {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        metadata,
    });

    return subscription;
}

export async function createConnectedAccount(
    email: string,
    metadata?: Record<string, string>
) {
    const account = await stripe.accounts.create({
        type: "express",
        email,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
        metadata,
    });

    return account;
}

export async function createAccountLink(accountId: string, returnUrl: string, refreshUrl: string) {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: "account_onboarding",
    });

    return accountLink;
}

export async function createTransfer(
    amount: number,
    destination: string,
    metadata?: Record<string, string>
) {
    const transfer = await stripe.transfers.create({
        amount,
        currency: "usd",
        destination,
        metadata,
    });

    return transfer;
}

export async function constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
) {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
