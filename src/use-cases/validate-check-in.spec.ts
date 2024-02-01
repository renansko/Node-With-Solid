import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'
import { LateCheckInValidation } from './errors/late-check-in-validation-error'

// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let checkInRepositoryInMemory: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check in Use case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepositoryInMemory)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInRepositoryInMemory.create({
      gyn_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.is_validated).toEqual(expect.any(Date))
    expect(checkInRepositoryInMemory.items[0].is_validated).toEqual(
      expect.any(Date),
    )
  })
  it('not should be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'Inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
  it('not should be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // utc

    const createdCheckIn = await checkInRepositoryInMemory.create({
      gyn_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMS = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMS)

    expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidation)
  })
})
