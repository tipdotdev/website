const config = {
    port: process.env.PORT || 8080,
    jwt: {
        secret: process.env.JWT_TOKEN as string,
        expiresIn: "30 days"
    },
    crypto: {
        key: process.env.MASTER_ENCRYPT_KEY as string
    },

    redis: {
        url: process.env.REDIS_URL as string,
        token: process.env.REDIS_TOKEN as string
    },
    db: {
        url: process.env.DATABASE_URL as string
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY as string,
        publicKey: process.env.STRIPE_PUB_KEY as string,
        webhookSecret: process.env.STRIPE_WH_SECRET as string
    },
    resend: {
        apiKey: process.env.RESEND_API_KEY as string,
        webhookSecret: process.env.RESEND_WEBHOOK_SECRET as string
    },
    aws: {
        s3: {
            bucketName: process.env.BUCKET_NAME as string,
            accessKey: process.env.R2_ACCESS_KEY as string,
            secretKey: process.env.R2_SECRET_ACCESS_KEY as string,
            tokenValue: process.env.R2_TOKEN_VALUE as string,
            api: process.env.S3_API as string
        },
        ses: {
            accessKey: process.env.SES_ACCESS_KEY as string,
            secretKey: process.env.SES_SECRET as string,
            region: process.env.SES_REGION as string
        }
    },
    cloudflare: {
        turnstile: {
            secretKey: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY as string
        }
    },
    oauth: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            redirectUri: process.env.GITHUB_REDIRECT_URI as string
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectUri: process.env.GOOGLE_REDIRECT_URI as string
        }
    },
    frontend: {
        url: process.env.FRONTEND_URL as string
    }
};

export default config;
