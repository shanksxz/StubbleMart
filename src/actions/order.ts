"use server";

import { db } from "@/server/db";
import { OrderData, orderSchema, ZodError } from "@/validators";

export async function placeOrder(foo: OrderData) {
    try {
        const {
            userEmail,
            productId,
            state,
            city,
            landSize,
            serviceType,
        } = orderSchema.parse(foo);

        const order = await db.order.create({
            data: {
                userEmail,
                productId,
                state,
                city,
                landSize,
                serviceType,
            },
        });

        if (!order) {
            return {
                success: false,
                message: "Order could not be placed. Please try again later.",
                statusCode: 500,
            };
        }

        return {
            success: true,
            message: "Order placed successfully.",
            statusCode: 200,
            data: order,
        };
    } catch (error) {
        if(error instanceof ZodError) {
            return {
                success: false,
                message: error.errors[0]?.message,
                statusCode: 400,
            };
        }

        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            statusCode: 500,
        };
    }   
}
