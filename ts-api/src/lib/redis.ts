import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
    },
    password: process.env.REDIS_PASSWORD,
    port: 6379,
} as any)

// Export the connect function

redis.connect()
 
export { redis };