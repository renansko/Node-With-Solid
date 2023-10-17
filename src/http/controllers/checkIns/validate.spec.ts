import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthentitcateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate CheckIN (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to be validate a check-in', async () => {
    const { token } = await createAndAuthentitcateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    let checkIn = await prisma.chekin.create({
      data: {
        gyn_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.chekin.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.is_validated).toEqual(expect.any(Date))
  })
})

// Toda vez que executar um teste END to END "Controllers"
// Executar o ambiente criado para ele antes que rode o teste
// Na pasta Prisma Vitest-Environment
