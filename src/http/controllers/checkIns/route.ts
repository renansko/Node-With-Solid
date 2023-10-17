import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verift-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  // MVC - Model - view - controller
  // controller lida com a entrada de dados com uma função http

  app.addHook('onRequest', verifyJwt)
  // veriftJwt Middleware de verificação

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
