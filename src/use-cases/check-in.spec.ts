import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/in-memory-check-in-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryGymRepository } from '@/repositories/inMemory/in-memory-gym-repository'
import { Prisma } from '@prisma/client'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let checkInRepositoryInMemory: InMemoryCheckInRepository
let gymRepositoryInMemory: InMemoryGymRepository
let sut: CheckInUseCase

describe('Authenticate Use case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    gymRepositoryInMemory = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepositoryInMemory, gymRepositoryInMemory)

    gymRepositoryInMemory.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Prisma.Decimal(-25.539203),
      longitude: new Prisma.Decimal(-49.2740054),
    })

    await gymRepositoryInMemory.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -25.539203,
      longitude: -49.2740054,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.539203,
      userLongitude: -49.2740054,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    // Garantir que está sendo criado na mesma data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.539203,
      userLongitude: -49.2740054,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -25.539203,
        userLongitude: -49.2740054,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should  be able to check in twice but in different days', async () => {
    // Garantir que está sendo criado na mesma data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.539203,
      userLongitude: -49.2740054,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.539203,
      userLongitude: -49.2740054,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in out distance gym', async () => {
    gymRepositoryInMemory.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Prisma.Decimal(-27.0747279),
      longitude: new Prisma.Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
