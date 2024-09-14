import { z } from "zod";

export const orderSchema = z.object({
  userEmail: z.string().email("Email is invalid").default(""),
  productId: z.string(),
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

export const collaborationOptions = [
    "Stubble purchasing company",
    "Machine rental",
    "Transportation company",
    "Agriculture shops"
] as const;

export const stepTitles = [
    "Company Information",
    "Company Details",
    "Confirmation"
] as const;


export const formSchema = z.object({
    collaborationType: z.enum(collaborationOptions),
    companyName: z.string().min(1, "Company name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    companyAddress: z.string().min(1, "Company address is required"),
    companyDescription: z.string().optional(),
    query: z.string().optional(),
    crops: z.array(z.object({
        cropName: z.string().min(1, "Crop name is required"),
        priceRangeFrom: z.string().min(1, "Price range from is required"),
        priceRangeTo: z.string().min(1, "Price range to is required"),
    })).optional(),
});



export type FormData = z.infer<typeof formSchema>;
export const ZodError = z.ZodError;
export type ProductData = z.infer<typeof productSchema>;
export type OrderData = z.infer<typeof orderSchema>;