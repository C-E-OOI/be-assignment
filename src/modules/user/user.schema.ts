import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const userCore = {          // define the common user schema
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is not valid"
    }).email(),
    full_name: z.string(),
    phone: z.string(),
    username: z.string(),
}

const createUserSchema = z.object({
    ...userCore,        // re-use the userCore object
    password: z.string({
        required_error: "Password is required"
    })
});

const createUserResponseSchema = z.object({
    ...userCore,
    id: z.number(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is not valid"
    }).email(),
    password: z.string(),
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
});

// ...
export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: UserSchema, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
});