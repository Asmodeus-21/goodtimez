import { NextRequest, NextResponse } from "next/server";
import { stripe, constructWebhookEvent } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        );
    }

    try {
        const event = constructWebhookEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        // Handle different event types
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const userId = paymentIntent.metadata.userId;
                const amount = paymentIntent.amount / 100; // Convert from cents

                // Calculate tokens (1 token = $0.10)
                const tokens = amount * 10;

                // Update user wallet
                await prisma.wallet.update({
                    where: { userId },
                    data: {
                        tokenBalance: {
                            increment: tokens,
                        },
                    },
                });

                // Create transaction record
                await prisma.transaction.create({
                    data: {
                        userId,
                        type: "DEPOSIT",
                        status: "COMPLETED",
                        amount,
                        currency: "USD",
                        paymentMethod: "stripe",
                        paymentId: paymentIntent.id,
                        description: `Purchased ${tokens} tokens`,
                    },
                });

                console.log(`✅ Payment succeeded: ${userId} purchased ${tokens} tokens`);
                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                const userId = paymentIntent.metadata.userId;

                // Create failed transaction record
                await prisma.transaction.create({
                    data: {
                        userId,
                        type: "DEPOSIT",
                        status: "FAILED",
                        amount: paymentIntent.amount / 100,
                        currency: "USD",
                        paymentMethod: "stripe",
                        paymentId: paymentIntent.id,
                        description: "Payment failed",
                    },
                });

                console.log(`❌ Payment failed: ${userId}`);
                break;
            }

            case "charge.dispute.created": {
                const dispute = event.data.object;
                const chargeId = dispute.charge;

                // Find the transaction
                const transaction = await prisma.transaction.findFirst({
                    where: { paymentId: chargeId as string },
                });

                if (transaction) {
                    // Update transaction status
                    await prisma.transaction.update({
                        where: { id: transaction.id },
                        data: { status: "DISPUTED" },
                    });

                    // Flag user for review
                    await prisma.user.update({
                        where: { id: transaction.userId },
                        data: { status: "SUSPENDED" },
                    });

                    console.log(`⚠️ Chargeback alert: ${transaction.userId}`);
                }
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 400 }
        );
    }
}
