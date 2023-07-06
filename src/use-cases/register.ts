import { UsersRepository } from '@/repositories/users-repositories'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './erros/users-already-exists-error'

interface registerUseCaseParams {
  name: string
  email: string
  password: string
}
// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: registerUseCaseParams) {
    // 6 numero de rounds

    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
