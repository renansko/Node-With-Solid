import { CheckInRepository } from '@/repositories/check-Ins-repository'
import { Chekin } from '@prisma/client'

interface FetchUserHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserHistoryUseCaseResponse {
  checkIn: Chekin[]
}

export class FetchUserHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserHistoryUseCaseRequest): Promise<FetchUserHistoryUseCaseResponse> {
    const checkIn = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIn,
    }
  }
}
