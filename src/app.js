"use strict";
// app.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const user_schema_1 = require("./modules/user/user.schema");
const account_schema_1 = require("./modules/account/account.schema");
const transaction_schema_1 = require("./modules/transaction/transaction.schema");
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const account_route_1 = __importDefault(require("./modules/account/account.route"));
const transaction_route_1 = __importDefault(require("./modules/transaction/transaction.route"));
const fastify = (0, fastify_1.default)();
fastify.register(jwt_1.default, {
    secret: process.env.JWT_SECRET || 'some-secret-key'
});
fastify.addHook('preHandler', (req, res, next) => {
    req.jwt = fastify.jwt;
    return next();
});
fastify.register(cookie_1.default, {
    secret: process.env.COOKIE_SECRET || 'some-secret-key',
    hook: 'preHandler',
});
fastify.decorate('authenticate', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.cookies.access_token;
    if (!token) {
        return reply.status(401).send({ message: 'Authentication required' });
    }
    const decoded = request.jwt.verify(token);
    request.user = decoded;
}));
fastify.get('/helloworld', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return { message: 'Hello World!' };
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            transformStaticCSP: (header) => header,
            exposeRoute: true
        });
        // Executes Swagger
        fastify.ready(err => {
            if (err)
                throw err;
            fastify.swagger();
        });
        for (const schema of [...user_schema_1.UserSchema, ...account_schema_1.AccountSchema, ...transaction_schema_1.TransactionSchema]) { // It should be before you register your routes
            fastify.addSchema(schema);
        }
        fastify.register(user_route_1.default, { prefix: 'api/user' });
        fastify.register(account_route_1.default, { prefix: 'api/account' });
        fastify.register(transaction_route_1.default, { prefix: 'api/transaction' });
        try {
            yield fastify.listen({ port: 3000, host: "0.0.0.0" });
            console.log("Server listening at http://localhost:3000");
        }
        catch (error) {
            console.error(error);
            process.exit(1); // exit as failure
        }
    });
}
main();
