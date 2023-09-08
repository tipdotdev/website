import express, { Request, Response } from 'express';
const router = express.Router();
import dbClient from '../lib/db';
import dotenv from 'dotenv';
import { authToken } from '../lib/jwt';
import { encrypt, decrypt, encryptObj } from '../lib/crypto';
import { redis } from '../lib/redis';
import stripe from 'stripe';
import { generateAccessToken } from '../lib/jwt';

// import model
import * as User from '../lib/modules/userModule';
import { UserModel } from '../interfaces/User';

dotenv.config();

const db = dbClient.db(process.env.DATABASE_NAME);

// routes here
// get me, authenticated
router.get('/me', authToken, async (req:any, res:Response) => {

    // get the user from the request
    const userID = req.user

    // get the user by userID
    const user:any = await User.getUserById(userID)

    if (!user) {
        return res.status(400).json({ error: { message: "user not found" } })
    }

    // return the user
    return res.json({ user: user })

})

// get user by username, unauthenticated
router.get("/:username", async (req:Request, res:Response) => {

    const {username} = req.params

    // get the user by username
    const original:any = await User.getUserByUsername(username)

    // check if we got a user
    if (!original) {
        return res.status(400).json({ error: { message: "user not found" } })
    }

    // set the user type to UserModel
    const user:UserModel = original

    // strip sensitive data
    delete user.email
    delete user.created_at
    delete user.updated_at
    delete user.last_login
    delete user.subscriptions
    delete user.supporters

    // return the user
    return res.json({ user: user })

})

// update me, authenticated
router.post("/update/me", authToken, async (req:any, res:Response) => {

    const userID = req.user
    const { data } = req.body

    // update the user
    const user = await User.updateUser(userID, data)

    // check if we got a user
    if (!user) {
        return res.status(500).json({ error: { message: "error updating user" } })
    }

    // return the user
    return res.json({ message: "user updated" })

})

// export router
export { router as userRouter }