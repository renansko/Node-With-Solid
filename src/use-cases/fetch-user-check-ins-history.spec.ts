import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/in-memory-check-in-repository'
import { FetchUserHistoryUseCase } from './fetch-user-check-ins-history'
// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let checkInRepositoryInMemory: InMemoryCheckInRepository
let sut: FetchUserHistoryUseCase

describe('Fetch Check-in History Use case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new FetchUserHistoryUseCase(checkInRepositoryInMemory)
  })

  it('should be able to check in history', async () => {
    await checkInRepositoryInMemory.create({
      gyn_id: 'gym_01',
      user_id: 'user-01',
    })

    await checkInRepositoryInMemory.create({
      gyn_id: 'gym_02',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gyn_id: 'gym_01' }),
      expect.objectContaining({ gyn_id: 'gym_02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepositoryInMemory.create({
        gyn_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gyn_id: 'gym-21' }),
      expect.objectContaining({ gyn_id: 'gym-22' }),
    ])
  })
})
