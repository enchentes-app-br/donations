export default {
  $id: 'Identifier',
  type: 'object',
  required: ['_id'],
  additionalProperties: false,
  properties: {
    _id: {
      type: 'string',
      format: 'uuid',
    },
  },
};
