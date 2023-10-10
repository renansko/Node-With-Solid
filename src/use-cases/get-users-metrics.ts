import { CheckInRepository } from '@/repositories/check-Ins-repository'

interface GetUserMetricsHistoryUseCaseRequest {
  userId: string
}

interface GetUserMetricsHistoryUseCaseResponse {
  checkIsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsHistoryUseCaseRequest): Promise<GetUserMetricsHistoryUseCaseResponse> {
    const checkIsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkIsCount,
    }
  }
}
