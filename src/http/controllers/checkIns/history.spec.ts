import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthentitcateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Historic of Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-Ins', async () => {
    const { token } = await createAndAuthentitcateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await prisma.chekin.createMany({
      data: [
        {
          gyn_id: gym.id,
          user_id: user.id,
        },
        {
          gyn_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIn).toEqual([
      expect.objectContaining({ gyn_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gyn_id: gym.id, user_id: user.id }),
    ])
  })
})

// Toda vez que executar um teste END to END "Controllers"
// Executar o ambiente criado para ele antes que rode o teste
// Na pasta Prisma Vitest-Environment
