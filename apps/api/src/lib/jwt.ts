import jwt from "jsonwebtoken";
import config from "../config";

// generate token
function generateJWT(payload: object) {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
}

// verify token
function verifyJWT(token: string) {
    return jwt.verify(token, config.jwt.secret);
}

export { generateJWT, verifyJWT };
