const express = require("express");
const bodyParser = require("body-parser");
var morgan = require('morgan')

// create express app
const api = express();

// middleware
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use((req, res, next) => {
    // allow all origins
    res.header("Access-Control-Allow-Origin", "*");
    // allow all headers
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
api.use(bodyParser.json());
api.use(morgan('short'))

// import routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const newsRouter = require('./routes/news')

// base route
api.get("/", (req, res) => {
    res.json({ message: "r u lost?" });
});

// routes
api.use('/v1/auth', authRouter)
api.use('/v1/user', userRouter)
api.use('/v1/news', newsRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8000;
api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});