import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUsersRepository)

  return useCase
}
