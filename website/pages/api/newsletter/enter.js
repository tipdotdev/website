import { EmailTemplate } from "@/comps/emailTemplates/newsletterenter";
import { Resend } from "resend";
import mysql from 'mysql2'

const dbUrl = process.env.DATABASE_URL

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
    // get the user's email from the request body
    const body = JSON.parse(req.body)

	try {

        // connect to the database
        const db = mysql.createConnection(dbUrl)

        const data = await resend.emails.send({
            from: "Tip.dev <no-reply@tip.dev>",
            to: body.email,
            subject: "Welcome to tip.dev",
            react: EmailTemplate(),
        })

        // query the database
        db.promise().execute(`
            INSERT INTO newsletter (email)
            VALUES ('${body.email}')
        `).then(() => {

            res.status(200).json({
                message: `email sent`,
                success: true,
                data: data,
            });

        }).catch((error) => {
            return res.status(400).json(error)
        })

  	} catch (error) {
    	res.status(400).json(error);
  	}
};