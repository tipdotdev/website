import express from 'express';
const router = express.Router();
import client from '../utils/db.js';
import dotenv from 'dotenv';
import { redis } from '../utils/redis.js';

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);

// enter newsletter, unprotected
router.post("/enter", (req, res) => {
    const { email } = req.body;

    // make sure the email is valid
    if (!email) {
        return res.status(400).json({ error: { message: "missing email" } });
    }

    // make sure the format is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: {
                message: "invalid email format"
            }
        });
    }

    // check if email is already in redis
    redis.sIsMember('td-newsletter', email).then((result) => {
        if (result) {
            return res.status(400).json({ 
                error: {
                    message: "email already exists"
                }
            });
        } else {
            // add email to redis
            redis.sAdd('td-newsletter', email).then((result) => {
                return res.json({ message: "success" });
            })
        }
    })
})

// get all newsletter members, unprotected
router.get("/members/get/all", async (req, res) => {
    let members = await redis.sMembers("td-newsletter");

    return res.json({ members: members });
})

export { router as newsRouter }