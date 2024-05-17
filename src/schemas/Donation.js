import DonationContent from './DonationContent.js';

const Donation = JSON.parse(JSON.stringify(DonationContent)); // TODO Deep Cloning

Donation.$id = 'Donation';

Donation.required.push('_id');

Donation.properties._id = {
  type: 'string',
  format: 'uuid',
};

export default Donation;
