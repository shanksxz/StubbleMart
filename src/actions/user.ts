"use server"
import { db } from "@/server/db/db";
import { z } from "zod";
import bcrypt from "bcrypt";

const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").default(""),
    email: z.string().email("Email is invalid").default(""),
    password: z.string().min(6, "Password must be at least 6 characters").default(""),
    address: z.string().min(3, "Address must be at least 3 characters").default(""),
    phoneNumber: z.string().min(11, "Phone number must be at least 11 characters").default(""),
});

export async function registerUser({
    name,
    email,
    password,
    address,
    phoneNumber,
}: z.infer<typeof signupSchema>) {
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data : {
                name,
                email,
                password : hashedPassword,
                address,
                phoneNumber,
            }
        })

        await db.account.create({
            data : {
                userId : user.id,
                provider : "credentials",
                type : "credentials",
                providerAccountId : user.id,
            }
        })



        return {
            success: true,
            message: "User created successfully",
            user,
        }
        
    } catch (error) {
        if(error instanceof z.ZodError) {
            return {
                success: false,
                message: error.errors[0]?.message,
            }
        }

        return {
            success: false,
            message: "Something went wrong",
        }
    }
}   
