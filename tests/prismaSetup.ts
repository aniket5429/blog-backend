import prismaClient from '../src/services/prismaService'

beforeAll(async () => {
    await prismaClient.$connect()
})

afterAll(async () => {
    await prismaClient.$executeRawUnsafe(
        'TRUNCATE TABLE "Blog" RESTART IDENTITY CASCADE;',
    )
    await prismaClient.$disconnect()
})
