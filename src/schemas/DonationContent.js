export default {
  $id: 'DonationContent',
  type: 'object',
  required: ['lat', 'long', 'types', 'contact'],
  additionalProperties: false,
  properties: {
    lat: {
      type: 'number',
      exclusiveMinimum: -90,
      exclusiveMaximum: 90,
      multipleOf: 0.00000001,
      example: -30.033056,
    },
    long: {
      type: 'number',
      exclusiveMinimum: -180,
      exclusiveMaximum: 180,
      multipleOf: 0.00000001,
      example: -51.230000,
    },
    types: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: { $ref: 'Type' },
    },
    contact: { $ref: 'Contact' },
  },
};
