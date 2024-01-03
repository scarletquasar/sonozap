import Fastify from 'fastify';
import Mercurius from 'mercurius';
import { readFile } from 'fs/promises';
import { resolvers } from './data/resolvers';

const main = async () => {
    const schema = await readFile('/schema.graphql').then(buffer => buffer.toString());
    const fastify = Fastify({ logger: true });
    
    fastify.register(Mercurius, {
        schema,
        resolvers
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