import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/inMemory/in-memory-gym-repository'
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms'
// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymUseCase

describe('Fetch nearby gyms Use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
