import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  // MVC - Model - view - controller
  // controller lida com a entrada de dados com uma função http
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
