import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gyms-repository'

interface SearchGymUseCaseParams {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseParams): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
