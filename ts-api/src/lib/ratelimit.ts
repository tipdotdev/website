import rateLimit from 'express-rate-limit';

const ratelimits = {
    global: rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 100, // Max requests per windowMs for all routes
    }),


    specificRoute: rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 50, // Max requests per 1 hour for a specific route
    }),
};

export default ratelimits;