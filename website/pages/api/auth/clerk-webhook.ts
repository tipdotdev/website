import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { Webhook } from 'svix'
import { buffer } from 'micro'
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL as string

export const config = {
    api: {
        bodyParser: false,
    }
}

const secret = process.env.CLERK_WEBHOOK_SECRET as string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const payload = (await buffer(req)).toString();
    const headers = req.headers as Record<string, string>;

    const wh = new Webhook(secret)
    let msg: any;

    // verify the webhook
    try {
        msg = wh.verify(payload, headers)
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'unauthorized' })
    }

    // set the webhook event
    const event = msg as WebhookEvent

    if (event) {
        // connect to the database
        const db = mysql.createConnection(dbUrl)

        switch (event.type) {
            // user created
            case 'user.created':
                
                // create a new user in the database
                db.promise().execute(`INSERT INTO users (
                    id, email, username, pfp, bio, website, socials, first_name, last_name, created_at, updated_at
                    ) VALUES (
                        ${event.data.id}, ${event.data.email_addresses[0].email_address}, ${event.data.username}, ${event.data.profile_image_url},
                        ${event.data.public_metadata.about}, ${event.data.public_metadata.website}, ${event.data.public_metadata.socials},
                        ${event.data.first_name}, ${event.data.last_name}, ${event.data.created_at}, ${event.data.updated_at}
                )`).then(() => {
                    db.promise().execute(`
                        INSERT INTO pages (
                            id, user_id, icon, banner, bio, website, socials, created_at, updated_at
                        ) VALUES (
                            ${event.data.id}, ${event.data.id}, ${event.data.profile_image_url}, ${event.data.profile_image_url},
                            ${event.data.public_metadata.about}, ${event.data.public_metadata.website}, ${event.data.public_metadata.socials},
                            ${event.data.created_at}, ${event.data.updated_at}
                        )
                    `).then(() => {
                        return res.status(200).json({ message: 'created user' })
                    })
                })
        }
    }

}