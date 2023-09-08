import dbClient from '../../lib/db'
import { redis } from '../../lib/redis';
import { AuthCodeEmail } from '../../../transactional/emails/authCode';
import { resend } from '../resend';
import { comparePassword, encrypt, hashPassword } from '../crypto';
import { decrypt } from 'dotenv';

const db = dbClient.db(process.env.DATABASE_NAME);

async function quickCheckUsernameAvailability(username:string) {

    const result = await redis.sIsMember("td-usernames", username)
    
    if (result) {
        return false
    }

    return true
}

async function checkUsernameAvailability(username:string) {
    const result = await db.collection("users").findOne({username: username})

    if (result) {
        return false
    }

    return true
}

async function checkEmailAvailability(email:string) {
    const result = await db.collection("users").findOne({email: email})

    if (result) {
        return false
    }

    return true
}

async function saveAuthCode(userId:string, authCode:number) {

    const hashedCode = hashPassword(authCode.toString())
    
    const result = await redis.hSet('td:emailVerification', userId, JSON.stringify({ code: hashedCode }))

    if (result) {
        return true
    }

    return false

}

async function verifyAuthCode(userId:string, authCode:number) {

    const result = await redis.hGet('td:emailVerification', userId)

    if (!result) {
        return false
    }

    const parsed = JSON.parse(result)

    const validCode:any = comparePassword(authCode.toString(), parsed.code)

    if (!validCode) {
        return false
    } else {
        return true
    }

}

async function signin(email:string, password:string) {

    // get the user from the email
    const user = await db.collection("users").findOne({email: email})

    // make sure a user was found
    if (!user) {
        return {
            error: {
                message: "user not found"
            }
        }
    }

    // compare the passwords
    const validPassword:any = comparePassword(password, user.password)

    // make sure the passwords match
    if (!validPassword) {
        return {
            error: {
                message: "incorrect password"
            }
        }
    }

    // strip sensitive data
    delete user.password
    delete user._id

    // return the user
    return {
        user: user
    }

}   

// export 
export {
    checkUsernameAvailability,
    quickCheckUsernameAvailability,
    checkEmailAvailability,
    saveAuthCode,
    verifyAuthCode,
    signin
}