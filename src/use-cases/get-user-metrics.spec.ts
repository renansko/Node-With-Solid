import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/in-memory-check-in-repository'
import { GetUserMetricsUseCase } from './get-users-metrics'
// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let checkInRepositoryInMemory: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepositoryInMemory)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepositoryInMemory.create({
      gyn_id: 'gym_01',
      user_id: 'user-01',
    })

    await checkInRepositoryInMemory.create({
      gyn_id: 'gym_02',
      user_id: 'user-01',
    })

    const { checkIsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkIsCount).toEqual(2)
  })
})
