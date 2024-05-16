import { mongodb } from '@fastify/mongodb';

export default async function(request, reply) {
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
};
