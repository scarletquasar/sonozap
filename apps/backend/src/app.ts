import Fastify from 'fastify';
import Mercurius from 'mercurius';
import { readFile } from 'fs/promises';
import { getResolvers } from './resolvers.js';
import { Database } from './features/profiling/data.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { configDotenv } from 'dotenv';
import { join } from 'path';
import cors, { FastifyCorsOptions } from '@fastify/cors';

const main = async () => {
    if (process.env.CURRENT_ENV !== 'production') {
        configDotenv({
            path: join(process.cwd(), '../..', '.env')
        })
    }

    const schema = await readFile('./schema.graphql').then(buffer => buffer.toString());
    const fastify = Fastify({ logger: true });

    const queryClient = postgres({
        user: process.env.POSTGRES_USER,
        pass: process.env.POSTGRES_PASSWORD,
        db: process.env.PG_DATABASE,
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT)
    });

    const db: Database = drizzle(queryClient);

    fastify.register(Mercurius, {
        schema,
        resolvers: getResolvers(db),
        routes: false
    });

    //TODO: Setup prod uri
    const corsOptions: FastifyCorsOptions = {
        origin: process.env.CURRENT_ENV === 'development' ? true : 'prod-uri'
    };

    fastify.register(cors, corsOptions);

    fastify.register(import('@fastify/websocket'), {
        options: { maxPayload: 1048576 }
    });

    fastify.post('/graphql', async function (req, reply) {
        const body = req.body as { query: string, variables: unknown };
        return reply.graphql(body.query, {}, body.variables);
    });

    fastify.get('/messaging', { websocket: true }, (conn, req) => {

    });

    await fastify
        .listen({ port: Number(process.env.BACKEND_PORT) })
        .catch(reason => {
            console.log(reason);
        });
};

await main();