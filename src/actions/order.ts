"use server";

import { db } from "@/server/db/db";
import { OrderData, orderSchema, ZodError } from "src/validators";
import { getCurrUser } from "./user";

export async function placeOrder(foo: OrderData) {
    
    try {

        const foo = await getCurrUser();

        if(!foo.success) {
            return {
                success: false,
                message: foo.message,
                statusCode: 404,
            };
        }

        const {
            userEmail,
            productId,
            state,
            city,
            landSize,
            serviceType,
        } = orderSchema.parse(foo);

        const order = await db.order.create({
            data : {
                city,
                landSize,
                productId,
                serviceType,
                state,
                userEmail,
                userId : foo.user?.id as string,
            }
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

        console.error(error);

        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            statusCode: 500,
        };
    }   
}

export async function delOrder(id: string) {
    try {

        const foo = await getCurrUser();

        if(!foo.success) {
            return {
                success: false,
                message: foo.message,
                statusCode: 404,
            };
        }

        const order = await db.order.delete({
            where: {
                id,
            },
        });

        if (!order) {
            return {
                success: false,
                message: "Order could not be deleted. Please try again later.",
                statusCode: 500,
            };
        }

        return {
            success: true,
            message: "Order deleted successfully.",
            statusCode: 200,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            statusCode: 500,
        };
    }
}
