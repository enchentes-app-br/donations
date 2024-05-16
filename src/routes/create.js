import { mongodb } from '@fastify/mongodb';

export default {

  onRequest: [
    async function(request, reply) {
      try {
        const token = await request.jwtVerify();
        const user = token.user;

        user._id = new mongodb.UUID(user._id);

        request.token = token;
        request.user = user;
      } catch (e) {
        request.log.error(e);
        reply.status(401)
          .send();
      }
    },
  ],

  schema: {
    summary: 'Create a Donation',
    tags: ['donations'],
    security: [ { Token: [] } ],
    body: { $ref: 'Donation' },
    response: {
      201: { $ref: 'Identifier' },
      401: { type: 'null', description: 'Unauthorized' },
    },
  },

  handler: async function(request, reply) {
    const _id = new mongodb.UUID();
    const createdAt = new Date();
    const user = request.user;

    const donation = {
      _id,
      createdAt,
      user,
      ...request.body,
    };

    donation.location = {
      type: 'Point',
      coordinates: [ donation.long, donation.lat ],
    };

    delete donation.lat;
    delete donation.long;

    await this.mongo.db.collection('donations')
      .insertOne(element);

    reply.status(201)
      .send({ _id });
  },

};
