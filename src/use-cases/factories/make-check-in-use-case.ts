import { PrismaCheckInsRepository } from '@/repositories/Prisma/prisma-checkin-repository'
import { CheckInUseCase } from '../checkin'
import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
