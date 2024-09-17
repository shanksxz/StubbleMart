import { env } from "@/env";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : env.EMAIL_SERVER_USER,
        pass : env.EMAIL_SERVER_PASSWORD
    }
});


