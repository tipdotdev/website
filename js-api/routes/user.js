const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { authToken } = require('../utils/jwt');
const { encrypt, decrypt, encryptObj } = require('../utils/crypto');

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);

// get me, protected
router.get("/me", authToken, (req, res) => {

    const user = req.user;

    db.collection('users').findOne({ username: user }).then((result) => {
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

// get user by username, protected
router.get("/:username", authToken, (req, res) => {

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
router.put("/update/me", authToken, (req, res) => {
    
    const user = req.user;
    const { data } = req.body

    // update the user
    db.collection('users').updateOne({ username: user}, { $set: data }).then(() => {
        return res.json({
            message: "success",
        });
    }).catch((err) => {
        console.log('error')
        return res.status(400).json({ error: err });
    })
    
})

module.exports = router;