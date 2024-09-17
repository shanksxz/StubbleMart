"use server"

import { env } from "@/env";
import { transporter } from "./config";

export const sendMail = async (to : string, subject : string, html : string) => {
    try {
        await transporter.sendMail({
            from : env.EMAIL_SERVER_USER,
            to,
            subject,
            html
        });
    } catch (error) {
        console.error(error);
    }
};