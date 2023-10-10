import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gyms'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeSearchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
