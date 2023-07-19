import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import { Novu } from '@novu/node'

const dbUrl = process.env.DATABASE_URL as string
const novu = new Novu(process.env.NOVU_SECRET_KEY as string)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // // connect to the database
    // const db = mysql.createConnection(dbUrl)

    // db.promise().execute(`
    //     SELECT u.*, p.*, t.*
    //     FROM users u
    //     LEFT JOIN pages p ON u.id = p.user_id
    //     LEFT JOIN tips t ON u.id = t.user_id
    //     WHERE u.username = 'dickey';
    // `).then(([rows, fields]) => {
    //     res.status(200).json(rows)
    // }
    // ).catch((err) => {
    //     console.log(err)
    //     res.status(500).json({ message: 'Internal server error' })
    // })

    novu.subscribers.identify("user_2Slds0sBX3cETmka4trjZ8o7SBI", {
        email: "kyle@dickey.gg",
        username: "dickey",
    }).then((response: any) => {
        return res.status(200).json(response)
    }).catch((err: any) => {
        return res.status(500).json(err)
    })
}

/*
[
    {
        "id": "user_2SdrDhw5jawTx864hlzJ2BE1ohk",
        "email": "kyle@dickey.gg",
        "username": "dickey",
        "pfp": "https://www.gravatar.com/avatar/?d=mp",
        "bio": "i make stuff",
        "website": "https://dickey.gg",
        "socials": "{\"github\":\"dickeyy\",\"instagram\":\"kyle.dickeyy\",\"linkedin\":\"kyletdickey\",\"twitter\":\"kyledickeyy\"}",
        "first_name": "Kyle",
        "last_name": "Dickey",
        "created_at": "1689487180652",
        "updated_at": "1689487225014",
        "stripe_account_id": "acct_1NUO0IRjtzKX0Mia"
    }
]
*/