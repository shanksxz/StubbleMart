import { z } from "zod";

export const orderSchema = z.object({
  userEmail: z.string().email("Email is invalid").default(""),
  productId: z.number().int(),
  state: z.string().min(3, "State must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  landSize: z.string().min(3, "Land size must be at least 3 characters"),
  serviceType: z.array(z.string()).min(1, "Service Type must be at least 1"),
});

export const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    imgUrl : z.string().url("Thumbnail must be a valid URL"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string(),
});


export const ZodError = z.ZodError;
export type ProductData = z.infer<typeof productSchema>;
export type OrderData = z.infer<typeof orderSchema>;