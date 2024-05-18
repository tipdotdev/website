import { Elysia, t } from "elysia";
import { BadRes, GoodRes } from "../types/response-type";
import { getUserById } from "../lib/user";
import { createPaymentIntent } from "../lib/stripe";
import log from "../lib/logger";

const stripe = new Elysia({ prefix: "/stripe" });

// POST /stripe/create/payment-intent
const createPISchema = {
    body: t.Object(
        {
            amount: t.Number({
                minimum: 100, // in cents
                maximum: 1000000, // in cents
                readOnly: true,
                description: "Amount to charge",
                error: "Invalid amount"
            }),
            currency: t.String({
                maxLength: 3,
                minLength: 3,
                readOnly: true,
                default: "usd",
                description: "Currency",
                error: "Invalid currency",
            }),
            to_user_id: t.String({
                maxLength: 255,
                minLength: 3,
                readOnly: true,
                description: "User to send the tip to",
                error: "Invalid user_id"
            }),
            from_user: t.Object({
                // make an nullable user_id
                user_id: t.Nullable(t.String({
                    maxLength: 255,
                    minLength: 3,
                    readOnly: true,
                    description: "User ID",
                    error: "Invalid user_id"
                })),
                email: t.String({
                    maxLength: 255,
                    minLength: 3,
                    readOnly: true,
                    description: "Email",
                    error: "Invalid email",
                    format: "email"
                }),
                username: t.Optional(t.Nullable(t.String({
                    maxLength: 255,
                    minLength: 3,
                    readOnly: true,
                    description: "Username",
                    error: "Invalid username"
                }))),
            },{
                error: "Invalid from_user"
            }),
            // optional metadata
            metadata: t.Optional(t.Object({
                message: t.Nullable(t.String({
                    maxLength: 255,
                    minLength: 3,
                    readOnly: true,
                    description: "Message",
                    error: "Invalid message"
                })),
                source: t.String({
                    maxLength: 255,
                    minLength: 3,
                    readOnly: true,
                    description: "Source",
                    error: "Invalid source"
                }),
            }, {
                error: "Invalid metadata"
            }))
    
        },
        {
            error: "Invalid request body"
        }
    )
};

stripe.post("/create/payment-intent", async ({ body, set }) => {
    // first make sure the to_user exists
    const toUser = await getUserById(body.to_user_id);
    if (!toUser) {
        set.status = 404;
        const response: BadRes = {
            message: "User not found",
            code: 404
        };
        return response;
    }

    const pi = await createPaymentIntent({
        amount: body.amount,
        currency: body.currency,
        to_user: toUser,
        from_user: body.from_user,
        metadata: {
            message: body.metadata?.message ,
            source: "stripe"
        }
    })
    if (!pi) {
        set.status = 500;
        const response: BadRes = {
            message: "Failed to create payment intent",
            code: 500
        };
        return response;
    }
    
    const response: GoodRes = {
        message: "Payment intent created",
        data: {
            client_secret: pi.client_secret
        }
    };

    return response
}, createPISchema);

export default stripe
