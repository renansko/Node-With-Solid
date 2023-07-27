import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymUseCaseParams {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUseCaseParams): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
