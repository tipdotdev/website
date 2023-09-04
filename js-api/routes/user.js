const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { authToken } = require('../utils/jwt');
const { encrypt, decrypt, encryptObj } = require('../utils/crypto');
const { redis } = require('../utils/redis');

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);

// get me, protected
router.get("/me", authToken, (req, res) => {

    const user = req.user;

    db.collection('users').findOne({ user_id: user }).then((result) => {
        if (result) {
            // remove sensitive data
            delete result.password;
            delete result._id

            return res.json({
                message: "success",
                user: result
            });
        } else {
            return res.status(400).json({ 
                error: {
                    message: "user not found"
                }
            });
        }
    }).catch((err) => {
        console.log('error')
        return res.status(400).json({ error: err });
    })

});

// get user by username, unprotected
router.get("/:username", (req, res) => {

    const { username } = req.params;

    db.collection('users').findOne({ username: username }).then((result) => {
        if (result) {
            // remove sensitive data
            delete result.password;
            delete result.stripe
            delete result.email
            delete result.user_id
            delete result._id
            delete result.created_at
            delete result.updated_at
            delete result.name
            delete result.tipCount
            delete result.tips
            delete result.subscribers
            delete result.subscriptions

            return res.json({
                message: "success",
                user: result
            });
        } else {
            return res.status(400).json({ 
                error: {
                    message: "user not found"
                }
            });
        }
    }).catch((err) => {
        console.log('error')
        return res.status(400).json({ error: err });
    })

});

// update me, protected
router.post("/update/me", authToken, (req, res) => {
    
    const user = req.user;
    const { data } = req.body

    console.log(data)

    // update the user
    db.collection('users').updateOne({ user_id: user}, { $set: data }).then(() => {
        // refetch the user
        db.collection('users').findOne({ user_id: user }).then((result) => {
            // delete the old user from redis
            redis.hDel('td:users', user).then(() => {
                // add the new user to redis
                redis.hSet('td:users', user, JSON.stringify(result)).then(() => {
                    return res.json({ message: "success" });
                }).catch((err) => {
                    return res.status(500).json({ error: { message: "internal server error" } });
                })
            }).catch((err) => {
                return res.status(500).json({ error: { message: "internal server error" } });
            })
        })
    })
    
})

module.exports = router;