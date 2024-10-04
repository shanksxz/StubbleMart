"use server";

import prisma from "@/server/db/db";
import { OrderData, orderSchema, ZodError } from "src/validators";
import { getCurrUser } from "./user";

export async function placeOrder(foo: OrderData) {
    
    try {

        const res = await getCurrUser();

        if(!res.success || !res.user) {
            return {
                success: false,
                message: res.message,
                statusCode: 404,
            };
        }

        const {
            state,
            city,
            landSize,
            serviceType,
        } = orderSchema.parse(foo);

        console.log("Order data: ", foo);

        const order = await prisma.order.create({
            data : {
                city,
                landSize,
                serviceType,
                state,
                userId : res.user.id,
            }
        });

        const orderItems = await prisma.orderItem.create({
            data: {
                orderId: order.id,
                productId: foo.productId,
                quantity: 1,
            }
        })

        console.log("Order: ", order);

        if (!order || !orderItems) {
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

        if(!foo.success || !foo.user) {
            return {
                success: false,
                message: foo.message,
                statusCode: 404,
            };
        }

        const order = await prisma.order.delete({
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
