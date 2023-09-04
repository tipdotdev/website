const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { authToken } = require('../utils/jwt');
const { generateKey, generateUUID, encrypt, decrypt } = require('../utils/crypto');
const { redis } = require('../utils/redis');

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);

// get my page views total, protected
router.get("/pageviews/me", authToken, (req,res) => {

    const user = req.user;

    redis.hGet('td:analytics', user).then((result) => {
        if (result) {
            let data = JSON.parse(result);
            return res.json({ message: "success", views: data.pageviews });
        } else {
            return res.status(400).json({ error: { message: "user not found" } });
        }
    }).catch((err) => {
        return res.status(400).json({ error: err });
    })

})

// post page view, unprotected
router.post("/pageviews/add", (req,res) => {
    const { user } = req.body;

    redis.hGet('td:analytics', user).then((result) => {
        if (result) {
            let data = JSON.parse(result);
            data.pageviews = data.pageviews + 1;

            redis.hSet('td:analytics', user, JSON.stringify(data)).then(() => {
                return res.json({ message: "success" });
            }).catch((err) => {
                return res.status(400).json({ error: err });
            })
        } else {
            return res.status(400).json({ error: { message: "user not found" } });
        }
    }).catch((err) => {
        return res.status(400).json({ error: err });
    })
})

// export router
module.exports = router