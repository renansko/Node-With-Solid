import { UsersRepository } from '@/repositories/users-repositories'
import { User } from '@prisma/client'
import { ResourcesNotFoundError } from './erros/resources-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userReposiroty: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userReposiroty.findById(userId)

    if (!user) {
      throw new ResourcesNotFoundError()
    }

    return {
      user,
    }
  }
}
