import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


/*
|--------------------------------------------------------------------------
| Send Email
|--------------------------------------------------------------------------
*/

const sendEmail = async ({
    to,
    subject,
    text,
    html,
}) => {

    if (!to) {
        throw new Error("Recipient email is required.");
    }

    const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME || "Blog CMS"}" <${process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER}>`,

        to,

        subject,

        text,

        html,
    };

    return transporter.sendMail(mailOptions);
};


/*
|--------------------------------------------------------------------------
| Password Reset Email
|--------------------------------------------------------------------------
*/

const sendPasswordResetEmail = async ({
    email,
    resetToken,
}) => {

    if (!email) {
        throw new Error("Email is required.");
    }

    if (!resetToken) {
        throw new Error("Password reset token is required.");
    }

    const frontendUrl =
        process.env.FRONTEND_URL || "http://localhost:5173";

    const resetUrl =
        `${frontendUrl}/reset-password/${resetToken}`;


    const subject =
        "Reset Your Password - Blog CMS";


    const text = `
Hello,

We received a request to reset your Blog CMS password.

Click the link below to reset your password:

${resetUrl}

This link will expire after the configured reset-token expiration period.

If you did not request a password reset, you can safely ignore this email.

Regards,
${process.env.MAIL_FROM_NAME || "Blog CMS"}
`;


    const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Reset Your Password</title>
</head>

<body
    style="
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        font-family: Arial, Helvetica, sans-serif;
    "
>

    <div
        style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px;
        "
    >

        <h1
            style="
                margin-top: 0;
                color: #111827;
                font-size: 24px;
            "
        >
            Reset Your Password
        </h1>


        <p
            style="
                color: #4b5563;
                line-height: 1.6;
            "
        >
            Hello,
        </p>


        <p
            style="
                color: #4b5563;
                line-height: 1.6;
            "
        >
            We received a request to reset your Blog CMS password.
        </p>


        <div style="margin: 30px 0;">

            <a
                href="${resetUrl}"
                style="
                    display: inline-block;
                    padding: 14px 24px;
                    background-color: #2563eb;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                "
            >
                Reset Password
            </a>

        </div>


        <p
            style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
            "
        >
            If the button above does not work, copy and paste the
            following URL into your browser:
        </p>


        <p
            style="
                word-break: break-all;
                color: #2563eb;
                font-size: 14px;
            "
        >
            ${resetUrl}
        </p>


        <p
            style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
            "
        >
            If you did not request a password reset, you can safely
            ignore this email.
        </p>


        <hr
            style="
                margin: 30px 0;
                border: none;
                border-top: 1px solid #e5e7eb;
            "
        />


        <p
            style="
                margin-bottom: 0;
                color: #9ca3af;
                font-size: 13px;
            "
        >
            Regards,<br />
            ${process.env.MAIL_FROM_NAME || "Blog CMS"}
        </p>

    </div>

</body>

</html>
`;


    return sendEmail({
        to: email,
        subject,
        text,
        html,
    });
};


/*
|--------------------------------------------------------------------------
| Verify SMTP Connection
|--------------------------------------------------------------------------
*/

const verifyEmailConnection = async () => {

    return transporter.verify();

};


export {
    sendEmail,
    sendPasswordResetEmail,
    verifyEmailConnection,
};

export default {
    sendEmail,
    sendPasswordResetEmail,
    verifyEmailConnection,
};