const express = require('express')
const router = express.Router()
const client = require('../utils/db');
const dotenv = require('dotenv');
const { authToken } = require('../utils/jwt');
const { generateUploadKey } = require('../utils/crypto');
const { redis } = require('../utils/redis');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

dotenv.config();

const db = client.db(process.env.DATABASE_NAME);

// configure multer
const storage = multer.memoryStorage();
const upload = multer({
    dest: 'uploads/',
    storage: storage
});

const S3 = new S3Client({
    region: 'auto',
    endpoint: process.env.S3_API,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

// upload avatar, protected
router.post("/avatar", authToken, upload.single("file"), async (req,res) => {

    const user = req.user;

    // generate a base64 key
    const key = generateUploadKey();

    await S3.send(
        new PutObjectCommand({
            Body: req.file.buffer,
            Bucket: 'tipdev',
            Key: `avatars/${key}`,
            ContentType: req.file.mimetype,
        })
    );

    // update user.pictures.avatar while keeping the rest of user.pictures
    const pictures = await db.collection('users').findOne({ user_id: user }).then((result) => {
        return result.pictures;
    }).catch((err) => {
        return res.status(500).json({ error: { message: "internal server error" } });
    })

    // remove the old avatar
    if (pictures.avatar) {
        delete pictures.avatar;
    }

    // add the new avatar
    pictures.avatar = `https://cdn.tip.dev/tipdev/avatars/${key}`;

    // update user
    db.collection('users').updateOne({ user_id: user }, { $set: { pictures: pictures } }).then((result) => {
        // re fetch user
        db.collection('users').findOne({ user_id: user }).then((result) => {
            // remove the user from redis
            redis.hDel('td:users', user).then(() => {
                // add the new user to redis
                redis.hSet('td:users', user, JSON.stringify(result)).then(() => {
                    return res.json({ message: "success", url: `https://cdn.tip.dev/tipdev/avatars/${key}` });
                }).catch((err) => {
                    return res.status(500).json({ error: { message: "internal server error" } });
                })
            }).catch((err) => {
                return res.status(500).json({ error: { message: "internal server error" } });
            })
        })
    })


})

// upload banner, protected
router.post("/banner", authToken, upload.single("file"), async (req,res) => {

    const user = req.user;

    // generate a base64 key
    const key = generateUploadKey();

    await S3.send(
        new PutObjectCommand({
            Body: req.file.buffer,
            Bucket: 'tipdev',
            Key: `banners/${key}`,
            ContentType: req.file.mimetype,
        })
    );

    // update user.pictures.avatar while keeping the rest of user.pictures
    const pictures = await db.collection('users').findOne({ user_id: user }).then((result) => {
        return result.pictures;
    }).catch((err) => {
        return res.status(500).json({ error: { message: "internal server error" } });
    })

    // remove the old banner
    if (pictures.banner) {
        delete pictures.banner;
    }

    // add the new avatar
    pictures.banner = `https://cdn.tip.dev/tipdev/banners/${key}`;

    // update user
    db.collection('users').updateOne({ user_id: user }, { $set: { pictures: pictures } }).then((result) => {
        // re fetch user
        db.collection('users').findOne({ user_id: user }).then((result) => {
            // remove the user from redis
            redis.hDel('td:users', user).then(() => {
                // add the new user to redis
                redis.hSet('td:users', user, JSON.stringify(result)).then(() => {
                    return res.json({ message: "success", url: `https://cdn.tip.dev/tipdev/banners/${key}` });
                }).catch((err) => {
                    return res.status(500).json({ error: { message: "internal server error" } });
                })
            }).catch((err) => {
                return res.status(500).json({ error: { message: "internal server error" } });
            })
        })
    })



})

module.exports = router