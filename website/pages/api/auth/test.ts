import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import connect from '@/utils/db'
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL as string

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const db = mysql.createConnection(dbUrl)

    // get all users from the database
    const users = await db.promise().query(`DELETE FROM users`).then((result) => {
        return res.status(200).json({ message: 'deleted all users' })
    })

}