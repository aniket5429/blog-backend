import prismaClient from '../src/services/prismaService'

beforeAll(async () => {
    console.log('before each db', process.env.DATABASE_URL)
    await prismaClient.$connect()
})

afterAll(async () => {
    await prismaClient.$disconnect()
})
