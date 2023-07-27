import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gyms-repository'

interface GymUseCaseParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymUseCaseResponse {
  gym: Gym
}
// SOLID

// D - Dependency Inversion Principle

export class GymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUseCaseParams): Promise<GymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
