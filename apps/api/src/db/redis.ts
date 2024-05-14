import { Redis } from "@upstash/redis";
import config from "../config";

const redis = new Redis({
    url: config.redis.url,
    token: config.redis.token
});

export default redis;
