import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verift-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  // MVC - Model - view - controller
  // controller lida com a entrada de dados com uma função http

  app.addHook('onRequest', verifyJwt)

  // veriftJwt Middleware de verificação

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
