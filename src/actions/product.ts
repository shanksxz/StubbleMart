//TODO: add authentication

"use server"

import prisma from "@/server/db/db";
import { ProductData, productSchema, ZodError } from "src/validators";
import { getCurrUser } from "./user";

export async function createProduct(data: ProductData) {
    try {

        const res = await getCurrUser();

        if(!res.success || !res.user) {
            return {
                success: false,
                message: res.message,
                statusCode: 404,
            };
        }

        const validatedData = productSchema.parse(data);

        const product = await prisma.product.create({
            data: {
                ...validatedData,
                createdBy: res.user.id
            },
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
        const products = await prisma.product.findMany();
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

export async function getProductById({ id }: { id: string }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    const relatedProducts = await prisma.product.findMany({
      where: {
        id: { not: id }, 
      },
      take: 3, 
    });

    return { success: true, product, relatedProducts };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, message: "Failed to fetch product" };
  }
}


export async function updateProduct({ id, data } : {
    id: string,
    data: ProductData
}) {
    try {
        const validatedData = productSchema.parse(data);

        const product = await prisma.product.update({
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
        const product = await prisma.product.delete({
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