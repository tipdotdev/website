import express, { Request, Response } from 'express';
import { WaitlistEmail } from '../transactional/emails/waitlist';
import { resend } from './lib/resend';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ratelimits from './lib/ratelimit';

// create express app
const api = express();

// middleware
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use((req, res, next) => {
	// allow origins from anywhere for dev
	res.setHeader('Access-Control-Allow-Origin', '*');
	// allow all headers for dev
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
})
api.use(bodyParser.json());
api.use(morgan('short'));

// import routers
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { newsRouter } from './routes/news';
import { uploadRouter } from './routes/upload';
import { analyticsRouter } from './routes/analytics';
import { stripeRouter } from './routes/stripe';

// base route
api.get("/", ratelimits.global, (req, res) => {
    res.json({ message: "r u lost?" });
});

// use routers
api.use('/v1/auth', authRouter);
api.use('/v1/user', userRouter);
api.use('/v1/news', newsRouter);
api.use('/v1/upload', uploadRouter);
api.use('/v1/analytics', analyticsRouter);
api.use('/v1/stripe', stripeRouter);

// set port, launch server
const port = 8000;
api.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default api;