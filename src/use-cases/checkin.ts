import { CheckInRepository } from '@/repositories/check-Ins-repository'
import { Chekin } from '@prisma/client'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: Chekin
}

export class CheckInUseCase {
  constructor(private checkInReposiroty: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInReposiroty.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInReposiroty.create({
      gyn_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
