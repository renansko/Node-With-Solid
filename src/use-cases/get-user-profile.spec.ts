import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'

// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let userRepositoryInMemory: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepositoryInMemory)
  })
  it('should be able to autheticate', async () => {
    const createdUser = await userRepositoryInMemory.create({
      name: 'Joe',
      email: 'JoeDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Joe')
  })

  it('should not be able to get a user profile with wrong ID', async () => {
    expect(() =>
      sut.execute({
        userId: 'An-Id-if-not-exist',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})
