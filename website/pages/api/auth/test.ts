import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL as string

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // connect to the database
    const db = mysql.createConnection(dbUrl)

    db.promise().execute(`SELECT * FROM users`).then(([rows, fields]) => {
        return res.status(200).json({ rows })
    })
}