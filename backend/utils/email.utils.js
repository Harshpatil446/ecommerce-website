const { default: nodemailer } = require("nodemailer")
const nodeMailer = require("nodemailer")

const sendEmail = async (to, subject, text) => {
    try {
        const transponder = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        await transponder.sendMail(mailOptions)
    } catch (error) {
        console.error("Error while sending email: ", error)
    }
}

module.exports = sendEmail 