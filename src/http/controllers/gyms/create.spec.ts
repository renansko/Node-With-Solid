import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthentitcateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to be create a gym', async () => {
    const { token } = await createAndAuthentitcateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '41999085475',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})

// Toda vez que executar um teste END to END "Controllers"
// Executar o ambiente criado para ele antes que rode o teste
// Na pasta Prisma Vitest-Environment
