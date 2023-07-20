import { Chekin, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInRepository } from '../check-Ins-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: Chekin[] = []

  findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.ChekinUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gyn_id: data.gyn_id,
      is_validated: data.is_validated ? new Date(data.is_validated) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
