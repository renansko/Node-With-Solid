import { CheckInRepository } from '@/repositories/check-Ins-repository'

interface GetUserMetricsHistoryUseCaseRequest {
  userId: string
}

interface GetUserMetricsHistoryUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsHistoryUseCaseRequest): Promise<GetUserMetricsHistoryUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
