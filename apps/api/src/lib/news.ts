import redis from "../db/redis";

async function isMember(email: string): Promise<boolean> {
    const result = await redis.sismember("td:news", email);
    return result === 1;
}

async function enter(email: string): Promise<boolean> {
    const result = await redis.sadd("td:news", email);
    return result === 1;
}

export { isMember, enter };
