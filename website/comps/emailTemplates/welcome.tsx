import * as React from "react";

interface EmailTemplateProps {
	username: string;
	firstName: string;
	lastName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  	username,
	firstName,
	lastName,
}) => (
	<div>
		<h1>Hey, {username}</h1>
		<p>
			Welcome to tip.dev
		</p>
	</div>
);
