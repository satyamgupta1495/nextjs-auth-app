import nodemailer from "nodemailer";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        // this will generate a hashes token [random]
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {

            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "eaccff171ae5a2",
                pass: "43f1917a579333"
            }

        });

        const mailOptions = {
            from: "satyamgupta1495@gmail.com",
            to: "reetikasharma0610@gmail.com",
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType.toLowerCase()}email/token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify" : "reset"} your password</p> or copy this link 
            <br/>
            <a href="${process.env.DOMAIN}/${emailType.toLowerCase()}email/token=/${hashedToken}">${process.env.DOMAIN}/${emailType.toLowerCase()}/${hashedToken}</a>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
    }
}