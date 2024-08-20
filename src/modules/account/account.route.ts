import { FastifyInstance } from "fastify";
import { 
    createAccountHandler, 
    getBalanceByAccountHandler, 
    checkBalanceHandler, 
    checkIsCreditTypeHandler, 
    getCreditAccountByIdHandler ,
    updateBalanceHandler
} from "./account.controller";
import { $ref } from "./account.schema";


async function accountRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/create', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: $ref("createAccountSchema"),
                response: {
                    201: $ref("responseAccountSchema"), 
                },
            },
        }, 
        createAccountHandler,
    );

    fastify.get(
        '/', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                querystring: $ref("accountQuery"),
                response: {
                    201: $ref("responseBalanceAccountSchema"), 
                },
            },
        }, 
        getBalanceByAccountHandler,
    );
    fastify.get(
        '/user/:id', 
        {
            preHandler: [fastify.authenticate],
        }, 
        getCreditAccountByIdHandler,
    );

    fastify.get(
        '/balance', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                response: {
                    201: $ref("responseBalanceAccountSchema"), 
                },
            },
        }, 
        checkBalanceHandler,
    );

    fastify.post(
        '/check', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: $ref("getTypeByAccountNumber"),
            },
        }, 
        checkIsCreditTypeHandler,
    );

    fastify.put(
        '/balance', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: $ref("updateBalance"),
            },
        }, 
        updateBalanceHandler,
    );
}

export default accountRoutes;