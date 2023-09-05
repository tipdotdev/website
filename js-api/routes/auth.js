const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { generateAccessToken } = require('../utils/jwt');
const { generateKey, generateUUID, encrypt, decrypt, generateAuthCode } = require('../utils/crypto');
const { redis } = require('../utils/redis');
const { Novu } = require('@novu/node');
const { sendAuthCode } = require('../utils/mail');

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);
const novu = new Novu(process.env.NOVU_SECRET_KEY)

// signin, unprotected
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    
    if (!email && !password) {
        return res.status(400).json({ message: "missing username and password" });
    } else if (!email && password) {
        return res.status(400).json({ message: "missing username" });
    } else if (email && !password) {
        return res.status(400).json({ message: "missing password" });
    }

    // get the user
    db.collection('users').findOne({email: email}).then((result) => {
        if (result) {
            // check if password is correct
            if (decrypt(result.password, process.env.MASTER_ENCRYPT_KEY) == password) {
                let token = generateAccessToken(result.user_id);
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

    let uuID = generateUUID();
    let token = generateAccessToken(uuID);

    // gather data
    const data = {
        user_id: uuID,
        created_at: new Date(),
        updated_at: new Date(),
        username: username,
        email: email,
        password: encrypt(password, process.env.MASTER_ENCRYPT_KEY),
        pictures: {
            avatar: 'https://cdn.tip.dev/tipdev/avatars/default.jpeg',
        },
        emailVerified: false,
    }

    // save data to db and redis
    db.collection("users").insertOne(data).then((result) => {

        redis.hSet('td:users', uuID, JSON.stringify(data)).then((result) => {
            
            redis.sAdd(`td-usernames`, username).then((result) => {
                
                redis.hSet('td:analytics', uuID, JSON.stringify({ pageviews: 0 })).then((result) => {

                    novu.subscribers.identify(uuID, {
                        email: email,
                        username: username,
                    }).then((result) => {

                        // send email verification code
                        const code = generateAuthCode();

                        // save the code
                        redis.hSet('td:emailVerification', uuID, JSON.stringify({ code: encrypt(code, process.env.MASTER_ENCRYPT_KEY) })).then((result) => {
                            if (!result) {
                                return res.status(400).json({ error: { message: "code not found" } });
                            }
                        }).catch((err) => {
                            return res.status(400).json({ error: err });
                        })

                        const sendEmail = sendAuthCode(code, email);

                        if (sendEmail.error) {
                            return res.status(400).json({ error: sendEmail.error });
                        }

                        return res.json({
                            message: "success",
                            token: token,
                            expires_in: "730h"
                        });

                    }).catch((err) => {
                        return res.status(400).json({ error: err });
                    })

                }).catch((err) => {
                    return res.status(400).json({ error: err });
                })

            }).catch((err) => {
                return res.status(400).json({ error: err });
            })

        }).catch((err) => { 
            return res.status(400).json({ error: err });
        })

    }).catch((err) => {
        return res.status(400).json({ error: err });
    });

})

// check if username is available, unprotected
router.get("/check/:username", (req, res) => {

    console.log(req.params.username)

    redis.sIsMember('td-usernames', req.params.username).then((result) => {
        console.log(result)
        if (result) {
            console.log(`username ${req.params.username} is unavailable`)
            return res.status(401).json({ message: "username unavailable" });
        } else {
            console.log(`username ${req.params.username} is available`)
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
                    // update redis
                    redis.hGet('td:users', username).then((result) => {
                        let user = JSON.parse(result);
                        user.password = encrypt(newPassword, process.env.MASTER_ENCRYPT_KEY);
                        redis.hSet('td:users', username, JSON.stringify(user)).then((result) => {
                            return res.json({ message: "success" });
                        }).catch((err) => {
                            return res.status(400).json({ error: err });
                        })
                    }).catch((err) => {
                        return res.status(400).json({ error: err });
                    })
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