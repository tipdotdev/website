import express from 'express';
const router = express.Router();
import dbClient from '../lib/db';
import dotenv from 'dotenv';
import { authToken } from '../lib/jwt';
import { generateUUID } from '../lib/crypto';
import { redis } from '../lib/redis';
import multer from 'multer';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const db = dbClient.db(process.env.DATABASE_NAME);

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

// routes here

// export router
export { router as uploadRouter }