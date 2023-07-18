import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL as string

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // get the username from the query
    const username = req.query.user as string

    // connect to the database
    const db = mysql.createConnection(dbUrl)

    // get the user's info
    db.promise().execute(`SELECT * FROM users WHERE username='${username}'`).then((result: any) => {
        let user = result[0][0]

        // get the users tips
        db.promise().execute(`SELECT * FROM tips WHERE user_id='${user.id}'`).then((result: any) => {
            let tips = result[0][0]

            res.status(200).json({
                data: {
                    user: user,
                    tips: tips
                }
            })

        }).catch((err) => {
            res.status(500).json(err)
        })
    }).catch((err) => {
        res.status(500).json(err)
    })
}