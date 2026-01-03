import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0" }),
  stock: z.coerce.number().int().min(0, { message: "Stock cannot be negative" }),
  description: z.string().optional(),
  // Allow empty string OR valid URL
  imageUrl: z.string().url().optional().or(z.literal("")),
});