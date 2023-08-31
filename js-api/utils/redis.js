const dotenv = require('dotenv');
const { createClient } = require('redis');

dotenv.config();

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
    },
    password: process.env.REDIS_PASSWORD,
    port: 6379,
})

// Export the connect function

redis.connect((err) => {
    if (err) {
        console.log('error connecting to redis')
    } else {
        console.log('connected to redis')
    }
})
 
exports.redis = redis;