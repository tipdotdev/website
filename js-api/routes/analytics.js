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

// export router
module.exports = router