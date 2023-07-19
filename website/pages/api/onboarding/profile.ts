// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs'
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL as string

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    const user: any = getAuth(req)

    if (!user) {
        return res.status(401).json({ message: 'unauthorized' })
    }

    const { name, about, website, socials } = req.body

    let firstName = name.split(' ')[0]
    let lastName = name.split(' ')[1]

    // connect to the database
    const db = mysql.createConnection(dbUrl)

	// get the users data
	db.promise().execute(`SELECT * FROM users WHERE id = '${user.userId}'`).then(([rows, fields]: [any, any]) => {
		// get the account_number
		const account_number = rows[0].account_number

		const update = clerkClient.users.updateUser(user.userId, {
			firstName: firstName,
			lastName: lastName,
			publicMetadata: {
				about: about,
				website: website,
				socials: socials,
				acctNum: account_number
			}
		}).then((user) => {
			return res.status(200).json({ message: 'updated user object' })
		}).catch((err) => {
			console.log(err)
			return res.status(500).json({ message: 'Internal server error' })
		})
	}).catch((err) => {
		console.log(err)
		res.status(500).json({ message: 'Internal server error' })
	})

}
