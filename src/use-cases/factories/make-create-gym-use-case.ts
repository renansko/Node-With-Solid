import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'
import { GymUseCase } from '../create-gym'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new GymUseCase(gymsRepository)

  return useCase
}
