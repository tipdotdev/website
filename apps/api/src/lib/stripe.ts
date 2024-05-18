import { Stripe } from "stripe";
import config from "../config";
import { UserType } from "../types/user-type";

const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: "2024-04-10",
})

async function createPaymentIntent({
    amount,
    currency,
    to_user,
    from_user,
    metadata
}: {
    amount: number;
    currency: string;
    to_user: UserType
    from_user: {
        user_id: string | null;
        email: string;
        username?: string | null;
    }
    metadata: {
        message?: string | null;
        source: "stripe";
    };
}): Promise<any> {

    const pi = await stripe.paymentIntents.create({
        amount,
        currency,
        // application fee of 5% up to $10.
        // application_fee_amount: Math.min(amount * 0.05, 1000),
        statement_descriptor: "Tip.dev - " + to_user.username,
        metadata: {
            to_user_id: to_user.user_id,
            from_user: JSON.stringify(from_user),
            type: 0, 
            ...metadata
        }
    }, {
        stripeAccount: to_user.stripe?.id || null // the stripe account id of the user
    })

    return pi;

}

export { createPaymentIntent };