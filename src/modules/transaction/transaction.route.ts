import { FastifyInstance } from "fastify";

import { createTransactionHandler, getTransactionHandler } from "./transaction.controller";
import { $ref } from "./transaction.schema";


async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/send', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: $ref("createTransactionSchema")
            },
        }, 
        createTransactionHandler,
    );

    fastify.get(
        '/', 
        {
            preHandler: [fastify.authenticate],
            schema: {
                response: {
                    201: $ref("responseTransactionSchema"), 
                },
            },
        }, 
        getTransactionHandler,
    );
}

export default transactionRoutes;