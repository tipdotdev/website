import dbClient from "../db";
import { redis } from "../redis";
import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_SECRET_KEY)
const db = dbClient.db(process.env.DATABASE_NAME);

// import interfaces
import { UserModel } from "../../interfaces/User";

async function createUser(user:UserModel) {

    let step1 = await db.collection("users").insertOne(user)
    let step2 = await redis.hSet('td:users', user.user_id, JSON.stringify(user))
    let step3 = await redis.sAdd('td-usernames', user.username)
    let step4 = await redis.hSet('td:analytics', user.user_id, JSON.stringify({ pageviews: 0 }))
    let step5 = await novu.subscribers.identify(user.user_id, { email: user.email })

    if (step1 && step2 && step3 && step4 && step5) {
        return true
    }

    return false

}

async function getUserByUsername(username:string) {

    // get the user from the database
    const user = await db.collection('users').findOne({username: username})

    // check if we got a user
    if (!user) {
        return null
    }

    // strip sensitive data
    delete user._id
    delete user.password

    // return the user
    if (user) {
        return user
    }

}

async function getUserById(userId:string) {

    const user = await db.collection('users').findOne({user_id: userId})

    if (!user) {
        return null
    }

    // strip sensitive data
    delete user._id
    delete user.password

    if (user) {
        return user
    }

    return null

}

async function updateUser(userID:string, data:object) {

    const result = await db.collection('users').updateOne({user_id: userID}, {$set: data})

    if (result) {
        return true
    }

    return false

}

function deleteUser(user:UserModel) {
    // ...
}

// export all functions callable as User.<function>
export {
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser
}