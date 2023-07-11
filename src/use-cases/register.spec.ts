import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { UserAlreadyExistError } from './erros/users-already-exists-error'

// Patern 'InMemoryTest DataBase'

describe('Register Use case', () => {
  it('should be able to register', async () => {
    const userRepositoryInMemory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoryInMemory)

    const { user } = await registerUseCase.execute({
      name: 'Joe Doe',
      email: 'JoeDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registregion', async () => {
    const userRepositoryInMemory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoryInMemory)

    const { user } = await registerUseCase.execute({
      name: 'Joe Doe',
      email: 'JoeDoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHash = await compare('123456', user.password_hash)
    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const userRepositoryInMemory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoryInMemory)

    const email = 'JoeDoe@gmail.com'

    await registerUseCase.execute({
      name: 'Joe Doe',
      email,
      password: '123456',
    })
    // toda vez que realizar um expect tendo uma 'Promise' dentro dela, é necessario
    // expecificar que esse expect está em 'AWAIT'
    await expect(() =>
      registerUseCase.execute({
        name: 'Joe Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
