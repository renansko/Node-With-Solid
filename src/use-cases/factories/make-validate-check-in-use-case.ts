import { PrismaCheckInsRepository } from '@/repositories/Prisma/prisma-checkin-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

// Arquivos Factories servem apenas para utilizar uma função que criam entidades maiores,
// Não possuir regras de negocios, apenas instanciar clases, instancias, entidades com dependencias.

export function makeValidateCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
