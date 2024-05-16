import Fastify from 'fastify';

import FastifyPluginSwagger from '@fastify/swagger';
import FastifyPluginSwaggerUI from '@fastify/swagger-ui';
import FastifyPluginMongoDB from '@fastify/mongodb';
import FastifyPluginCORS from '@fastify/cors';
import FastifyPluginJWT from '@fastify/jwt';

import { promises as fs } from 'fs';

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
      coerceTypes: false,
      strict: false,
    },
  },
});

await fastify.register(FastifyPluginSwagger, {
  openapi: {
    info: {
      title: process.env.npm_package_name,
      version: process.env.npm_package_version,
      description: await fs.readFile('./README.md', 'utf8'),
    },
    components: {
      securitySchemes: {
        Token: {
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

await fastify.register(FastifyPluginSwaggerUI, {
  routePrefix: '/docs',
});

await fastify.register(FastifyPluginMongoDB, {
  forceClose: true,
  url: process.env.MONGODB_URL,
});

await fastify.register(FastifyPluginCORS, {
  origin: '*',
});

await fastify.register(FastifyPluginJWT, {
  secret: process.env.JWT_SECRET,
});

fastify.get('/', {
  schema: {
    summary: 'Retrieve Service Information',
    response: {
      200: {
        type: 'object',
        required: ['name', 'version'],
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          version: { type: 'string' },
        },
      },
    },
  },
  handler: async function(request, reply) {
    reply.status(200)
      .send({
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
      });
  },
});

export default fastify;
