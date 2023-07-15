import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL as string

// export const config = {
//     api: {
//         bodyParser: false,
//     }
// }

// const secret = process.env.CLERK_WEBHOOK_SECRET as string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // const payload = (await buffer(req)).toString();
    // const headers = req.headers as Record<string, string>;

    // const wh = new Webhook(secret)
    let msg = req.body as WebhookEvent

    // set the webhook event
    const event = msg

    if (event) {
        // connect to the database
        const db = mysql.createConnection(dbUrl)

        switch (event.type) {
            // user created
            case 'user.created':
                
                // create a new user in the database
                db.promise().execute(`INSERT INTO users (
                    id, email, username, pfp, bio, website, socials, first_name, last_name, created_at, updated_at, stripe_account_id
                    ) VALUES (
                        '${event.data.id}', '${event.data.email_addresses[0].email_address}', '${event.data.username}', '${event.data.profile_image_url}',
                        '${event.data.public_metadata.about}', '${event.data.public_metadata.website}', '${event.data.public_metadata.socials}',
                        '${event.data.first_name}', '${event.data.last_name}', '${event.data.created_at}', '${event.data.updated_at}', '${event.data.private_metadata.stripeAccountId}'
                )`).then(() => {
                    return res.status(200).json({ message: 'created user' })
                })

            case 'user.updated':
                // update the user in the database
                db.promise().execute(`UPDATE users SET
                    email = '${event.data.email_addresses[0].email_address}',
                    username = '${event.data.username}',
                    pfp = '${event.data.profile_image_url}',
                    bio = '${event.data.public_metadata.about}',
                    website = '${event.data.public_metadata.website}',
                    socials = '${JSON.stringify(event.data.public_metadata.socials)}',
                    first_name = '${event.data.first_name}',
                    last_name = '${event.data.last_name}',
                    stripe_account_id = '${event.data.private_metadata.stripeAccountId}',
                    updated_at = '${event.data.updated_at}'
                    WHERE id = '${event.data.id}'
                `).then(() => {
                    return res.status(200).json({ message: 'updated user' })
                })
            
            case 'user.deleted':
                // delete the user from the database
                db.promise().execute(`DELETE FROM users WHERE id = '${event.data.id}'`).then(() => {
                    return res.status(200).json({ message: 'deleted user' })
                })
        }
    } else {
        return res.status(400).json({ message: 'no event' })
    }

}