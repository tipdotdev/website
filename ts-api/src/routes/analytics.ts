import express from 'express';
const router = express.Router();
import dbClient from '../lib/db';
import dotenv from 'dotenv';
import { authToken } from '../lib/jwt';
import { generateKey, generateUUID, encrypt, decrypt } from '../lib/crypto';
import { redis } from '../lib/redis';

dotenv.config();

const db = dbClient.db(process.env.DATABASE_NAME);

// routes here

// export router
export { router as analyticsRouter }