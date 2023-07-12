import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeAutheticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const autheticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return autheticateUseCase
}
