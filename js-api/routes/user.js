const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { authToken } = require('../utils/jwt');
const { encrypt, decrypt, encryptObj, generateUID } = require('../utils/crypto');
const { redis } = require('../utils/redis');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
            delete result.email
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

// connect stripe, protected
router.post("/connect/stripe", authToken, async (req, res) => {

    const user = req.user;

    const stripeAccount = await stripe.accounts.create({
        type: 'express',
        capabilities: {
            card_payments: { requested: true }, 
            transfers: { requested: true },
        }
    });

    const accountLink = await stripe.accountLinks.create({
        account: stripeAccount.id,
        refresh_url: 'https://tip.dev/auth/stripe/refresh',
        return_url: 'https://tip.dev/dashboard',
        type: 'account_onboarding',
    });

    if (accountLink) {
        // save the stripe account id
        db.collection('users').updateOne({ user_id: user }, { $set: { stripe: stripeAccount } }).then(() => {
            // refetch the user
            db.collection('users').findOne({ user_id: user }).then((result) => {
                // delete the old user from redis
                redis.hDel('td:users', user).then(() => {
                    // add the new user to redis
                    redis.hSet('td:users', user, JSON.stringify(result)).then(() => {
                        return res.json({ message: "success", stripe: accountLink });
                    }).catch((err) => {
                        return res.status(500).json({ error: { message: "internal server error" } });
                    })
                }).catch((err) => {
                    return res.status(500).json({ error: { message: "internal server error" } });
                })
            })
        })
    } else {
        return res.status(500).json({ error: { message: "internal server error" } });
    }

})

// tip user, unprotected
router.post("/tip", (req,res) => {
    
    const { username, sender, tipData } = req.body;

    // get the user 
    db.collection('users').findOne({ username: username }).then((result) => {

        if (!result) {
            return res.status(400).json({ error: { message: "user not found" } });
        }

        const incomeEvent = {
            id: `income_${generateUID()}`,
            type: "tip",
            created_at: new Date(),
            updated_at: new Date(),
            status: "pending",
            amount: tipData.amount,
            currency: "usd",
            receiver: result.user_id,
            sender: sender.user_id,
            is_public: true,
            is_completed: false
        }


    }).catch((err) => {
        return res.status(400).json({ error: err });
    })

})

// verify user email, protected
router.post("/me/verify/email", authToken, (req,res) => {

    const { code } = req.body;
    const user = req.user;

    // get the user
    db.collection('users').findOne({ user_id: user }).then((result) => {
        if (!result) {
            return res.status(400).json({ error: { message: "user not found" } });
        }

        if (result.emailVerified) {
            return res.json({ message: "success" });
        }

        // get the code from redis
        redis.hGet('td:emailVerification', user).then((redisCode) => {

            // decrypt the code
            const encryptedCode = JSON.parse(redisCode)
            const decryptedCode = decrypt(encryptedCode.code, process.env.MASTER_ENCRYPT_KEY);

            if (decryptedCode != code) {
                return res.status(400).json({ error: { message: "incorrect code" } });
            }

            // delete the code from redis
            redis.hDel('td:emailVerification', user).then(() => {

                // update the user
                db.collection('users').updateOne({ user_id: user }, { $set: { emailVerified: true } }).then(() => {
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

})

// delete user, protected
router.post("/delete/me", authToken, (req,res) => {

    const user = req.user;

    // get the user
    db.collection('users').findOne({ user_id: user }).then((result) => {
        // delete the user from mongo
        db.collection('users').deleteOne({ user_id: user }).then(() => {
            // delete the user from redis 
            redis.hDel('td:users', user).then(() => {
                // delete the user analytics from redis
                redis.hDel('td:analytics', user).then(() => {
                    // delete the username from redis
                    redis.sRem('td-usernames', result.username).then(() => {
                        return res.json({ message: "success" });
                    }).catch((err) => {
                        return res.status(400).json({ error: err });
                    })
                })
            }).catch((err) => {
                return res.status(400).json({ error: err });
            })
        })
    })

})

module.exports = router;