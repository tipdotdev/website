// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs'
import connect from '../../../utils/db'

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

    const db = connect()

    const { name, about, website, socials } = req.body

    let firstName = name.split(' ')[0]
    let lastName = name.split(' ')[1]

    const update = await clerkClient.users.updateUser(user.userId, {
        firstName: firstName,
        lastName: lastName,
        publicMetadata: {
            about: about,
            website: website,
            socials: socials
        }
    })

    if (update) {
       return res.status(200).json({ message: 'updated user object' })
    }

}
