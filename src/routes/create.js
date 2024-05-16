import { mongodb } from '@fastify/mongodb';
import authorize from '../middlewares/authorize.js';

export default {

  onRequest: [
    authorize,
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
      .insertOne(donation);

    reply.status(201)
      .send({ _id });
  },

};
