import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shivneeraj2004@gmail.com",
        pass: "imqqjobtzszelvkp"
    }
})


