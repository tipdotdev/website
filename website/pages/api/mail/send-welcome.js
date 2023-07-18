import { EmailTemplate } from "@/comps/emailTemplates/welcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  // get the user's email from the request body
	const { email, username, firstName, lastName } = req.body;

	// somehow authenticate the request

	try {

		const data = await resend.emails.send({
			from: "Tip.dev <no-reply@tip.dev>",
			to: email,
			subject: "Welcome to tip.dev",
			react: EmailTemplate({ username: username, firstName: firstName, lastName: lastName }),
		})

		res.status(200).json({
			message: `email sent`,
			success: true,
			data: data,
		});

  	} catch (error) {
    	res.status(400).json(error);
  	}
};