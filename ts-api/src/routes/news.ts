import express from 'express';
const router = express.Router();
import dbClient from '../lib/db';
import dotenv from 'dotenv';
import { redis } from '../lib/redis';

dotenv.config();

// import modules
import * as News from '../lib/modules/newsModule';
import { validateEmail } from '../lib/validator';

// routes here
// enter, unauthenticated
router.post("/enter", async (req, res) => {
    const {email} = req.body

    if (!email) {
        return res.status(400).json({ error: { message: "missing email" } })
    }

    // validate email
    if (!validateEmail(email)) {
        return res.status(400).json({ error: { message: "invalid email format" } })
    }

    if (await News.checkIsMember(email)) {
        return res.status(400).json({ error: { message: "email already entered" } })
    }

    if (!News.enterMember(email)) {
        return res.status(400).json({ error: { message: "could not enter email" } })
    }

    return res.json({ success: { message: "entered email" } })
})

// export router
export { router as newsRouter }