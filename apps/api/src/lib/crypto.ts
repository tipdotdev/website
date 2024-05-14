import crypto from "crypto";
import config from "../config";
import redis from "../db/redis";

// encrypt string
async function encryptString(raw: string): Promise<string> {
    try {
        const masterKey = config.crypto.key;
        const key = crypto.pbkdf2Sync(masterKey, "salt", 32, 32, "sha512");
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
        let encrypted = cipher.update(raw, "utf8", "hex");
        encrypted += cipher.final("hex");
        const combined = iv.toString("hex") + encrypted + cipher.getAuthTag().toString("hex");
        return combined;
    } catch (error: any) {
        throw new Error("Encryption failed: " + error.message);
    }
}

// decrypt string
async function decryptString(encrypted: string): Promise<string> {
    try {
        const masterKey = config.crypto.key;
        const key = crypto.pbkdf2Sync(masterKey, "salt", 32, 32, "sha512");
        const iv = Buffer.from(encrypted.slice(0, 24), "hex");
        const ciphertext = encrypted.slice(24, -32);
        const authTag = Buffer.from(encrypted.slice(-32), "hex");
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(ciphertext, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (error: any) {
        throw new Error("Decryption failed: " + error.message);
    }
}

// compare hash
async function compareHash(raw: string, hash: string) {
    const result = await Bun.password.verify(raw, hash);
    return result;
}

// hash string
async function hashString(raw: string) {
    const hash = await Bun.password.hash(raw, {
        algorithm: "argon2id",
        timeCost: 10
    });
    return hash;
}

// generate UUID
function generateUUID(prefix?: string) {
    const uuid = crypto.randomUUID();
    if (prefix) {
        return `${prefix}_${uuid}`;
    }
    return uuid;
}

// generate auth code
function generateAuthCode() {
    return crypto.randomInt(100000, 999999);
}

// base64 encode
function base64Encode(raw: string) {
    return Buffer.from(raw).toString("base64");
}

// base64 decode
function base64Decode(encoded: string) {
    return Buffer.from(encoded, "base64").toString("utf-8");
}

// generate oauth state
async function generateOAuthState(provider: string): Promise<string> {
    const state = generateUUID("state_" + provider);
    await redis.setex(state, 60 * 5, "valid");
    return base64Encode(state);
}

// export everything
export {
    compareHash,
    hashString,
    generateUUID,
    generateAuthCode,
    encryptString,
    decryptString,
    base64Encode,
    base64Decode,
    generateOAuthState
};
