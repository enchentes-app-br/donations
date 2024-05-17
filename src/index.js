import fastify from './fastify.js';

// -------------------------------------------------------------------------------------------------

import DonationsSchemaType from './schemas/Type.js';
import DonationsSchemaContact from './schemas/Contact.js';
import DonationsSchemaDonationContent from './schemas/DonationContent.js';
import DonationsSchemaDonation from './schemas/Donation.js';
import DonationsSchemaIdentifier from './schemas/Identifier.js';

import DonationsRouteCreate from './routes/create.js';
import DonationsRouteFetch from './routes/fetch.js';

fastify.addSchema(DonationsSchemaType);
fastify.addSchema(DonationsSchemaContact);
fastify.addSchema(DonationsSchemaDonationContent);
fastify.addSchema(DonationsSchemaDonation);
fastify.addSchema(DonationsSchemaIdentifier);

fastify.post('/v1/donations', DonationsRouteCreate);
fastify.get('/v1/location/:lat/:long/donations', DonationsRouteFetch);

// -------------------------------------------------------------------------------------------------

export default fastify;
