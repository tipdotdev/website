import config from "../config";
import magicLinkEmail from "../emails/magic-link-email";
import { base64Encode } from "./crypto";
import log from "./logger";
import { SES, SendEmailCommandInput, SendEmailCommandOutput } from "@aws-sdk/client-ses";

const ses = new SES({
    region: config.aws.ses.region,
    credentials: {
        accessKeyId: config.aws.ses.accessKey,
        secretAccessKey: config.aws.ses.secretKey
    }
});

async function emailMagicLink(email: string, token: string, continueTo: string): Promise<object | null> {
    const link = `${config.frontend.url}/auth/magic?ec=${base64Encode(
        `email=${email}&token=${token}&continue=${encodeURIComponent(continueTo)}`
    )}`;

    const html = magicLinkEmail(link);

    const params: SendEmailCommandInput = {
        Source: "no-reply@mail.tip.dev",
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: ["hi@tip.dev"],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: html
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "[tip.dev] Magic Authentication Link"
            }
        }
    };

    try {
        const data = await ses.sendEmail(params);
        return data;
    } catch (error) {
        log.error("Failed to send magic link", error);
        return null;
    }
}

export { emailMagicLink };
