// app.ts

import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import { UserSchema } from './modules/user/user.schema';
import { AccountSchema } from "./modules/account/account.schema";
import { TransactionSchema } from "./modules/transaction/transaction.schema";
import userRoutes from "./modules/user/user.route";
import accountRoutes from "./modules/account/account.route";
import transactionRoutes from "./modules/transaction/transaction.route";

const fastify = Fastify();
fastify.register(fjwt, {
    secret: process.env.JWT_SECRET || 'some-secret-key'
});
fastify.addHook('preHandler', (req, res, next) => {
    req.jwt = fastify.jwt
    return next()
});
fastify.register(fCookie, {
    secret: process.env.COOKIE_SECRET || 'some-secret-key',
    hook: 'preHandler',
})
fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.cookies.access_token;
        if (!token) {
            return reply.status(401).send({ message: 'Authentication required' })
        }

        const decoded = request.jwt.verify<FastifyJWT['user']>(token)
        request.user = decoded
    }
)


fastify.get('/helloworld', async (req, res) => {
    return { message: 'Hello World!' }
})

async function main() {
    fastify.register(require('@fastify/swagger'), {});
    fastify.register(require('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Bank API',
                description: 'A REST API built with Fastify, Prisma and TypeScript',
                version: '1.0.0',
                contact: {
                    name: "Dany Ismail",
                    url: "https://danyismail.com",
                    email: "https://danyismail.com"
                },
            },
            externalDocs: {
                url: 'https://github.com/danyismail',
                description: 'Bank Service API',
            },
            host: '0.0.0.0:3000',
            basePath: '/',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        uiConfig: {
            docExpansion: 'none', // expand/not all the documentations none|list|full
            deepLinking: true,
        },
        staticCSP: false,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true
    });

    // Executes Swagger
    fastify.ready(err => {
        if (err) throw err
        fastify.swagger()
    })

    for (const schema of [...UserSchema, ...AccountSchema, ...TransactionSchema]) {         // It should be before you register your routes
        fastify.addSchema(schema);
    }

    fastify.register(userRoutes, {prefix: 'api/user'})
    fastify.register(accountRoutes, {prefix: 'api/account'})
    fastify.register(transactionRoutes, {prefix: 'api/transaction'})


    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server listening at http://localhost:3000");
        
    } catch (error) {
        console.error(error);
        process.exit(1);    // exit as failure
    }
}

main();