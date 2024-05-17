export default {

  schema: {
    summary: 'List Donations',
    tags: ['donations'],
    params: {
      type: 'object',
      required: ['lat', 'long'],
      additionalProperties: false,
      properties: {
        lat: { // TODO: $ref
          type: 'string',
          pattern: '^(-[1-9]|-?[1-8][0-9]|[0-9])(\\.[0-9]{1,8})?$', // > -90, < +90
          example: '-30.033056',
        },
        long: { // TODO $ref
          type: 'string',
          pattern: '^(-[1-9]|-?[1-9][0-9]|-?1[0-7][0-9]|[0-9])(\\.[0-9]{1,8})?$', // > -180, < +180
          example: '-51.230000',
        },
      },
    },
    query: {
      type: 'object',
      required: [],
      additionalProperties: false,
      properties: {
        type: { $ref: 'Type' },
      },
    },
    response: {
      200: {
        type: 'array',
        items: { $ref: 'Donation' },
      },
    },
  },

  handler: async function(request, reply) {
    const lat = parseFloat(request.params.lat);
    const long = parseFloat(request.params.long);

    const query = {};

    if (request.query.type) {
      query.types = request.query.type;
    }

    // TODO db.donations.createIndex({ location: '2dsphere' });

    const cursor = await this.mongo.db.collection('donations')
      .aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [
                long, // Longitude First!
                lat,
              ],
            },
            distanceField: 'distance',
            maxDistance: 10000, // 10Km
            query,
          },
        },
        {
          $limit: 10, // TODO request.query
        },
      ]);

    const dataset = await cursor.toArray();

    const donations = dataset.map((data) => {
      return {
        _id: data._id,
        lat: data.location.coordinates[1],
        long: data.location.coordinates[0],
        types: data.types,
        contact: data.contact,
      };
    });

    reply
      .status(200)
      .send(donations);
  },

};
