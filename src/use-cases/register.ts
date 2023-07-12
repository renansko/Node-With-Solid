import { UsersRepository } from '@/repositories/users-repositories'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './erros/users-already-exists-error'
import { User } from '@prisma/client'

interface registerUseCaseParams {
  name: string
  email: string
  password: string
}

interface registerUseCaseResponse {
  user: User
}
// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerUseCaseParams): Promise<registerUseCaseResponse> {
    // 6 numero de rounds
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
