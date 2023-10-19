import * as React from "react";

interface EmailTemplateProps {
	username: string;
	firstName: string;
	lastName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = () => (
  <div>
        <img src="https://www.tip.dev/logo-no-bg-v3.png" style={{width: "100px", height: "100px"}} />
        <h1>Thank you for signing up!</h1>
        <p>
            We will be in touch with updates and launch information.
        </p>
  </div>
);