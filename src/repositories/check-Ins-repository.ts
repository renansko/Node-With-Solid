import { Chekin, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.ChekinUncheckedCreateInput): Promise<Chekin>
  findByUserIdOnDate(userId: string, date: Date): Promise<Chekin | null>
  findManyByUserId(userId: string, page: number): Promise<Chekin[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<Chekin | null>
  save(checkIn: Chekin): Promise<Chekin>
}
