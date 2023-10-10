import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify() // Garantir que a rota profile não seja chamado sem token
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
