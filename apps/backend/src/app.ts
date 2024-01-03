import Fastify from 'fastify';
import Mercurius from 'mercurius';
import { readFile } from 'fs/promises';
import { getResolvers } from './data/resolvers';
import { Database } from './data/database';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const main = async () => {
    const schema = await readFile('/schema.graphql').then(buffer => buffer.toString());
    const fastify = Fastify({ logger: true });

    const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
    const db: Database = drizzle(queryClient);

    fastify.register(Mercurius, {
        schema,
        resolvers: getResolvers(db)
    });

    fastify.register(require('@fastify/websocket'), {
        options: { maxPayload: 1048576 }
    });
      
    fastify.get('/core', async function (req, reply) {
        const request = req as { body: { query: string } };
        const query = request.body.query;
        const response = await reply.graphql(query);

        reply.send(response);
    });

    fastify.get('/messaging', { websocket: true }, (conn, req) => {

    });
};

main();