//TODO: add authentication

"use server"

import { db } from "@/server/db/db";
import { ProductData, productSchema, ZodError } from "src/validators";

export async function createProduct(data: ProductData) {
    try {
        const validatedData = productSchema.parse(data);

        const product = await db.product.create({
            data: validatedData,
        });

        return {
            success: true,
            message: "Product created successfully",
            product,
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.errors[0]?.message,
            };
        }

        return {
            success: false,
            message: "Something went wrong",
        };
    }
}


export async function getAllProducts() {
    try {
        const products = await db.product.findMany();
        return {
            success: true,
            products,
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while retrieving the products.",
        };
    }
}

export async function getProductById({ id } : {
    id: string
}) {
    try {

        const product = await db.product.findUnique({
            where: { id },
        });

        if (!product) {
            return {
                success: false,
                message: "Product not found.",
            };
        }

        return {
            success: true,
            product,
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while retrieving the product.",
        };
    }
}


export async function updateProduct({ id, data } : {
    id: string,
    data: ProductData
}) {
    try {
        const validatedData = productSchema.parse(data);

        const product = await db.product.update({
            where: { id },
            data: validatedData,
        });

        return {
            success: true,
            message: "Product updated successfully",
            product,
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.errors[0]?.message,
            };
        }

        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

export async function deleteProduct({ id } : {
    id: string
}) {
    try {
        const product = await db.product.delete({
            where: { id },
        });

        if (!product) {
            return {
                success: false,
                message: "Product not found.",
            };
        }

        return {
            success: true,
            message: "Product deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while deleting the product.",
        };
    }
}