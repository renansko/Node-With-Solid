import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  // MVC - Model - view - controller
  // controller lida com a entrada de dados com uma função http
  app.post('/users', register)
}
