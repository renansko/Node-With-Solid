import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

// Patern 'InMemoryTest DataBase'

// sut principal elementro a ser testado

let userRepositoryInMemory: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepositoryInMemory)
  })
  it('should be able to autheticate', async () => {
    await userRepositoryInMemory.create({
      name: 'Joe',
      email: 'JoeDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'JoeDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to autheticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'JoeDoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to autheticate with wrong Password', async () => {
    await userRepositoryInMemory.create({
      name: 'Joe',
      email: 'JoeDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'JoeDoe@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
