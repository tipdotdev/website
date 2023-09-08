import { resend } from './resend';
import { WaitlistEmail } from "../../transactional/emails/waitlist";
import { AuthCodeEmail } from "../../transactional/emails/authCode";

function sendWaitlistEmail(email: string, name: string) {
    const emailData = {
        from: 'Tip.dev <no-reply@tip.dev>',
        to: [email],
        subject: 'Waitlist',
        react: WaitlistEmail({ name: name }),
    };

    const data = resend.emails.send(emailData);

    return data;
}

function sendAuthCode(email:string, code:number) {
    
    const data = {
        from: 'Tip.dev <no-reply@tip.dev>',
        to: [email],
        subject: 'Verify your email',
        react: AuthCodeEmail({ code: code }),
    }

    const result = resend.emails.send(data)

    return result

}

export { sendWaitlistEmail, sendAuthCode };
