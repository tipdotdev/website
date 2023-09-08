import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function generateAccessToken(userId) {
    return jwt.sign(userId, process.env.JWT_TOKEN);
}

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
  
        req.user = user
  
        next()
    })
}

// export functions
export { generateAccessToken, authToken };