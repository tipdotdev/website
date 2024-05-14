export default function magicLinkEmail(link: string) {
    return `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Magic Link Login</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #000;
                    }
                    p {
                        color: #000;
                    }
                    .link {
                        display: inline-block;
                        text-decoration: underline;
                    }
                    .light-text {
                        color: #6b6b6b;
                    }
                    .footer {
                        margin-top: 20px;
                        color: #000;
                        text-opacity: 0.5;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                    .footer-p {
                        color: #a5a5a6
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Sign in to your account</h1>
                    <p>You've requested to sign in to your account.</p>
                    <a href=${link} class="link">Click this link to continue.</a>
                    <p>Or, copy and paste this link into your browser:</p>
                    <a href=${link} class="link">${link}</a>
                    <br>
                    <p class="light-text">This link will expire in 5 minutes.</p>
                    <p class="light-text">If you didn't request this, you can safely ignore this email.</p>

                    <div class="footer">
                        <img src="https://www.tip.dev/images/png/logo.png" alt="tip.dev logo" width="30" height="20">
                    </div>
                </div>
            </body>
        </html>
    `;
}
