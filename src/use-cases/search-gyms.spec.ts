import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/inMemory/in-memory-gym-repository'
import { SearchGymUseCase } from './search-gyms'
// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let gymsRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Search gyms Use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'python Gym',
      description: null,
      phone: null,
      latitude: -25.539203,
      longitude: -49.2740054,
    })

    const { gyms } = await sut.execute({
      query: 'python Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'python Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `python Gym ${i}`,
        description: null,
        phone: null,
        latitude: -25.539203,
        longitude: -49.2740054,
      })
    }

    const { gyms } = await sut.execute({
      query: 'python Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'python Gym 21' }),
      expect.objectContaining({ title: 'python Gym 22' }),
    ])
  })
})
