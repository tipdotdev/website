import { Resend } from 'resend';
import WaitlistEmail from '../transactional/emails/waitlist.js';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendAuthCode(code, email) {
    // try {
    //     const data = await resend.emails.send({
    //         from: "Tip.dev <no-reply@tip.dev>",
    //         to: email,
    //         subject: "Tip.dev Email Verification",
    //         html: `<p>Your email verification code is: <b>${code}</b></p>`,
    //     })
    //     return data;
    // } catch (err) {
    //     return err;
    // }

    // try {
    //     const data = await resend.emails.send({
    //         from: "Tip.dev <no-reply@tip.dev>",
    //         to: email,
    //         subject: "Tip.dev Email Verification",
    //         html: VerifyEmail({code: code}),
    //     })

    //     return data;
    // } catch (err) {
    //     return err;
    // }

}

export { sendAuthCode };