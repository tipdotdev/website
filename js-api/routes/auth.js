const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { generateAccessToken } = require('../utils/jwt');
const { generateKey, generateUUID, encrypt, decrypt } = require('../utils/crypto');
const { redis } = require('../utils/redis');

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);

// signin, unprotected
router.post("/signin", (req, res) => {
    const { username, password } = req.body;
    
    if (!username && !password) {
        return res.status(400).json({ message: "missing username and password" });
    } else if (!username && password) {
        return res.status(400).json({ message: "missing username" });
    } else if (username && !password) {
        return res.status(400).json({ message: "missing password" });
    }

    // get the user
    db.collection('users').findOne({username: username}).then((result) => {
        if (result) {
            // check if password is correct
            if (decrypt(result.password, process.env.MASTER_ENCRYPT_KEY) == password) {
                let token = generateAccessToken(username);
                return res.json({
                    message: "success",
                    token: token,
                    expires_in: "730h"
                });
            } else {
                return res.status(400).json({ 
                    error: {
                        message: "incorrect password"
                    }
                });
            }
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
    });
});

// signup, unprotected
router.post("/signup", (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "missing username, password, or email" });
    }

    // first check if username already exists
    db.collection('users').findOne({username: username}).then((result) => {
        if (result) {
            return res.status(400).json({ 
                error: {
                    message: "username unavailable"
                }
            });
        }
    })

    // next validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: {
                message: "invalid email format"
            }
        });
    }

    // then check if email already exists
    db.collection("users").findOne({email: email}).then((result) => {
        if (result) {
            return res.status(400).json({ 
                error: {
                    message: "email already in use"
                }
            });
        }

    }).catch((err) => {
        return res.status(400).json({ error: err });
    })

    let token = generateAccessToken(username);

    // gather data
    const data = {
        user_id: generateUUID(),
        created_at: new Date(),
        updated_at: new Date(),
        username: username,
        email: email,
        password: encrypt(password, process.env.MASTER_ENCRYPT_KEY),
        website: null,
        bio: null,
        socials: [],
        name: {
            first: null,
            last: null
        },
        pictures: {
            avatar: null,
            banner: null
        },
        stripe: {
            id: null,
        },
        tips: [],
        posts: [],
        comments: [],
        likes: [],
        followers: [],
        following: [],
        subscribers: [],
        subscriptions: [],
        followerCount: 0,
        followingCount: 0,
        subscriberCount: 0,
        subscriptionCount: 0,
        postCount: 0,
        commentCount: 0,
        likeCount: 0,
        tipCount: 0,
    }

    // insert into db
    db.collection("users").insertOne(data).then((result) => {

        redis.hSet('td:users', username, JSON.stringify(data)).then((result) => {
            return res.json({ message: "success", token: token });
        }).catch((err) => { 
            return res.status(400).json({ error: err });
        })

    }).catch((err) => {
        return res.status(400).json({ error: err });
    });

})

// check if username is available, unprotected
router.get("/check/:username", (req, res) => {

    redis.hExists('td:users', req.params.username).then((result) => {
        if (result) {
            return res.status(403).json({ message: "username unavailable" });
        } else {
            return res.json({ message: "username available" });
        }
    })

})

// forgot password, unprotected
router.put("/forgot-password", (req, res) => {

    const {oldPassword, newPassword, username} = req.body;

    if (!oldPassword || !newPassword || !username) {
        return res.status(400).json({ message: "missing oldPassword, newPassword, or username" });
    }

    // get the user
    db.collection("users").findOne({username: username}).then((result) => {
        if (result) {
            // check if password is correct
            if (decrypt(result.password, process.env.MASTER_ENCRYPT_KEY) == oldPassword) {
                // update password
                db.collection("users").updateOne({username: username}, { $set: { password: encrypt(newPassword, process.env.MASTER_ENCRYPT_KEY) } }).then((result) => {
                    return res.json({ message: "success" });
                }).catch((err) => {
                    return res.status(400).json({ error: err });
                })
            } else {
                return res.status(400).json({ 
                    error: {
                        message: "incorrect password"
                    }
                });
            }
        } else {
            return res.status(400).json({ 
                error: {
                    message: "user not found"
                }
            });
        }
    }).catch((err) => {
        return res.status(400).json({ error: err });
    })
})

module.exports = router;