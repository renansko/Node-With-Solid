import { CheckInRepository } from '@/repositories/check-Ins-repository'
import { Chekin } from '@prisma/client'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidation } from './errors/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: Chekin
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourcesNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidation()
    }

    checkIn.is_validated = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
