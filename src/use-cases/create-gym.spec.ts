import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/inMemory/in-memory-gym-repository'
import { GymUseCase } from './create-gym'

// Patern 'InMemoryTest DataBase'

let gymRepositoryInMemory: InMemoryGymRepository
let sut: GymUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    gymRepositoryInMemory = new InMemoryGymRepository()
    sut = new GymUseCase(gymRepositoryInMemory)
  })
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -25.539203,
      longitude: -49.2740054,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
