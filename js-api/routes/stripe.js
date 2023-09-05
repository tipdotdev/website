const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { authToken } = require('../utils/jwt');
const { generateKey, generateUUID, encrypt, decrypt } = require('../utils/crypto');
const { redis } = require('../utils/redis');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const db = client.db(process.env.DATABASE_NAME);

// create a payement intent, unprotected
router.post("/create/payment-intent", async (req, res) => {

    const { amount, currency, username } = req.body

    // get the user 
    const user = await db.collection('users').findOne({ username: username }).then((result) => {
        return result;
    })

    if (!user) {
        return res.status(404).json({ error: { message: "user not found" } });
    }

    // create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount),
        currency: currency,
        automatic_payment_methods: {
            enabled: true,
        }
        
    }, {
        stripeAccount: user.stripe.id
    });

    // return the client secret
    return res.status(200).json({ client_secret: paymentIntent.client_secret });

});

// create an account session, unprotected
router.post("/create/account-session", async (req, res) => {

    const { username } = req.body

    // get the user
    const user = await db.collection('users').findOne({ username: username }).then((result) => {
        return result;
    })

    if (!user) {
        return res.status(404).json({ error: { message: "user not found" } });
    }

    try {

        // create an account session
        const accountSession = await stripe.accountSessions.create({
            account: user.stripe.id,
        })

        res.status(200).json({ client_secret: accountSession.client_secret });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: { message: "internal server error" } });
    }

})

// export router
module.exports = router;