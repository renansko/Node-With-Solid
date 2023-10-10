import { PrismaCheckInsRepository } from '@/repositories/Prisma/prisma-checkin-repository'
import { FetchUserHistoryUseCase } from '../fetch-user-check-ins-history'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeFetchUserCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserHistoryUseCase(checkInsRepository)

  return useCase
}
