import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserInput, LoginInput} from "./user.schema";
import { createUser, getUsers, findUserByEmail } from "./user.service";
import { verifyPassword } from "../../../utils/hash";

export async function registerUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput;
    }>, 
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const user = await createUser(body);
        return reply.status(201).send(user);
        
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            message: "Internal Server Error",
            error: error
        });
    }
}

export async function loginHandler(
    request: FastifyRequest<{
        Body: LoginInput
    }>, 
    reply: FastifyReply
) {
    const body = request.body;

    // Find a user by email 
    const user = await findUserByEmail(body.email);

    if (!user) {
        return reply.status(401).send({
            message: "Invalid email address. Try again!"
        });
    };

    // Verify password
    const isValidPassword = verifyPassword({
        candidatePassword: body.password,
        salt: user.salt,
        hash: user.password
    });

    if (!isValidPassword) {
        return reply.status(401).send({
            message: "Password is incorrect"
        });
    };

    // Generate access token
    const payload = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
    }
    const token = request.jwt.sign(payload);

    reply.setCookie('access_token', token, {
        path: '/',
        maxAge: 1000 * 60 * 30,     // for 30 minutes
        httpOnly: true,
        secure: true,
    })

    return { accessToken: token }
}

export async function getUsersHandler() {
    const users = await getUsers();

    return users;
}

export async function logoutHandler(request: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie('access_token');

    return reply.status(201).send({ message: 'Logout successfully' })
}