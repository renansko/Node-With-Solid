import { makeFetchUserCheckInUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const CheckInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = CheckInHistoryQuerySchema.parse(request.query)

  const checkInHistoryUseCase = makeFetchUserCheckInUseCase()

  const { checkIn } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIn,
  })
}
