"use server";
import { transporter } from "./config";

export const sendMail = async (mailContent: { companyName: string, email: string }) => {
    const mailOptions = {
        from: "shivneeraj2004@gmail.com",
        to: mailContent.email,
        subject: "Thank You for Collaborating with Stubble Mart!",
        html: `
        <p>Dear ${mailContent.companyName},</p>
        <p>Thank you for reaching out and showing interest in collaborating with Stubble Mart. We have received your details, and our team will review your profile promptly.</p>
        <p>We will get back to you as soon as possible with further steps and how we can work together to achieve our shared goals.</p>
        <p>If you have any questions or need additional information, please feel free to contact us.</p>
        <p>Best regards,<br>The Stubble Mart Team</p>
        <p class="footer">8694016666</p>
        
        `

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return "err"
        }
        console.log(info.messageId)
    })

}

