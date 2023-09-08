import express, {Request, Response} from 'express'
const router = express.Router()
import dbClient from '../lib/db'
import dotenv from 'dotenv'
import { generateAccessToken } from '../lib/jwt'
import { generateKey, generateUUID, encrypt, decrypt, hashPassword, comparePassword, generateAuthCode } from '../lib/crypto'
import { redis } from '../lib/redis';
import { Novu } from '@novu/node';
import { sendAuthCode } from '../lib/mail';
import { validateEmail } from '../lib/validator'
import { validateCaptcha } from '../lib/captcha'

// import interfaces
import { UserModel } from '../interfaces/User';

// import modules
import * as User from '../lib/modules/userModule';
import * as Auth from '../lib/modules/authModule';
import * as News from '../lib/modules/newsModule';

dotenv.config()

const db = dbClient.db(process.env.DATABASE_NAME);
const novu = new Novu(process.env.NOVU_SECRET_KEY)

// routes here
// /signup, unauthenticated
router.post('/signup', async (req:Request, res:Response) => {

    // get the data from the body
    const { email, password, username, joinNews } = req.body

    // check if all fields are present
    if (!email || !password || !username) {
        return res.status(400).json({ error: { message: "missing username, password, or email" } })
    }

    // vaidate captcha
    if (!validateCaptcha(req.body.cfTurnstileResponse)) {
        return res.status(400).json({ error: { message: "invalid captcha, please reload the page and try again" } })
    }

    // check if username is taken
    if (!Auth.checkUsernameAvailability(username)) {
        return res.status(400).json({ error: { message: "username unavailable" } })
    }

    // validate email
    if (!validateEmail(email)) {
        return res.status(400).json({ error: { message: "invalid email format" } })
    }

    // check if email is taken
    if (!Auth.checkEmailAvailability(email)) {
        return res.status(400).json({ error: { message: "email already in use" } })
    }

    // enter user into news if they want
    if (joinNews) {
        if (!await News.checkIsMember(email)) {
            await News.enterMember(email)
        }
    }

    // generate data
    let uuid = generateUUID('user')
    let hash = hashPassword(password)
    let now = new Date()
    let authCode = generateAuthCode()

    // set up user object
    const data:UserModel = {
        user_id: uuid,
        username: username,
        email: email,
        password: hash,
        created_at: now,
        updated_at: now,
        last_login: now,
        pictures: {
            avatar: 'https://cdn.tip.dev/tipdev/avatars/default.jpeg'
        },
        email_verified: false
    }

    // create user
    const user = await User.createUser(data)

    // make sure user created
    if (!user) {
        return res.status(500).json({ error: { message: "error creating user" } })
    }

    // save the auth code
    const saveAuthCode = await Auth.saveAuthCode(uuid, authCode)

    // make sure code saved
    if (!saveAuthCode) {
        return res.status(500).json({ error: { message: "error saving auth code" } })
    }

    // send auth code
    const sendAuthCodeEmail = sendAuthCode(email, authCode)

    // make sure code sent
    if (!sendAuthCodeEmail) {
        return res.status(500).json({ error: { message: "error sending auth code" } })
    }

    // return success
    return res.json({
        message: "success",
        userID: uuid
    })

})

// signin, unauthenticated
router.post("/signin", async (req:Request, res:Response) => {
    
    const { email, password } = req.body

    // first make sure all the parameters are there
    if (!email || !password) {
        return res.status(400).json({ error: { message: "missing email or password" } })
    }

    // vaidate captcha
    if (!validateCaptcha(req.body.cfTurnstileResponse)) {
        return res.status(400).json({ error: { message: "invalid captcha, please reload the page and try again" } })
    }

    // check email is valid format
    if (!validateEmail(email)) {
        return res.status(400).json({ error: { message: "invalid email format" } })
    }

    // signin
    let signinResponse:any = await Auth.signin(email, password) // returns user object if success, returns error object if fail

    if (signinResponse.error) {
        return res.status(400).json(signinResponse.error)
    }

    console.log(signinResponse)

    // generate access token
    const accessToken = generateAccessToken(signinResponse.user.user_id)

    return res.json({
        message: "success",
        token: accessToken
    })


})

// verify auth code, unauthenticated
router.post('/verify', async (req:Request, res:Response) => {

    const { userID, code } = req.body

    // make sure all parameters are present
    if (!userID || !code) {
        return res.status(400).json({ error: { message: "missing user id or code" } })
    }

    // make sure user exists
    const user = await User.getUserById(userID)

    if (!user) {
        return res.status(400).json({ error: { message: "user not found" } })
    }

    if (user.email_verified) {
        return res.json({ message: 'success' })
    }

    // make sure code is valid
    const validCode = await Auth.verifyAuthCode(userID, code)

    if (!validCode) {
        return res.status(400).json({ error: { message: "invalid code" } })
    }

    // update user
    const updateUser = await User.updateUser(userID, { email_verified: true })

    if (!updateUser) {
        return res.status(500).json({ error: { message: "error updating user" } })
    }

    // generate access token
    const accessToken = generateAccessToken(userID)

    // return success
    return res.json({
        message: "success",
        token: accessToken
    })

})

// check if username is available, unauthenticated
router.get('/check/:username', async (req:Request, res:Response) => {

    // get the username
    const username = req.params.username

    // check if username is taken
    if (!Auth.quickCheckUsernameAvailability(username)) {
        return res.status(400).json({ error: { message: "username unavailable" } })
    }

    // return success
    return res.json({
        message: "username available"
    })

})

// export router
export { router as authRouter }