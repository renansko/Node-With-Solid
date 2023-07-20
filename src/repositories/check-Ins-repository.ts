import { Chekin, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.ChekinUncheckedCreateInput): Promise<Chekin>
  findByUserIdOnDate(userId: string, date: Date): Promise<Chekin | null>
}
