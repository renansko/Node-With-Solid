import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'
import { FetchNearbyGymUseCase } from '../fetch-nearby-gyms'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}
