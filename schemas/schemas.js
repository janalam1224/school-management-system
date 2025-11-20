import { z } from "zod";

export const signupUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be no more than 50 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be no more than 100 characters" }),

  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be no more than 20 characters" }),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{11}$/, { message: "Phone number must be exactly 11 digits" }),

  isActive: z.boolean().default(true),

  roleId: z
    .number({
      required_error: "Role ID is required",
      invalid_type_error: "Role ID must be a number",
    })
    .int()
    .positive({ message: "Role ID must be a positive integer" }),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be no more than 100 characters" }),

  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be no more than 20 characters" }),
});
