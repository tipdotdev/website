// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    const auth: any = getAuth(req)
    const user = await clerkClient.users.getUser(auth.userId)

    if (!auth) {
        return res.status(401).json({ message: 'unauthorized' })
    }

    const stripeAccount = await stripe.accounts.create({
        type: 'express',
    });

    const update = await clerkClient.users.updateUser(user.id, {
        privateMetadata: {
            stripeAccountId: stripeAccount.id
        }
    })

    const accountLink = await stripe.accountLinks.create({
        account: stripeAccount.id,
        refresh_url: 'https://tip.dev/auth/stripe/refresh',
        return_url: 'https://tip.dev/dashboard',
        type: 'account_onboarding',
    });

    if (accountLink) {
        return res.status(200).json({ message: 'created stripe account', stripe: accountLink })
    } else {
        return res.status(500).json({ message: 'error creating stripe account' })
    }

}
