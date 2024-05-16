export default {
  $id: 'Contact',
  type: 'object',
  required: ['whatsapp'],
  additionalProperties: false,
  properties: {
    whatsapp: {
      type: 'string',
      pattern: '^\\+55[0-9]{5,11}$',
      example: '+5551987654321',
    },
  },
};
