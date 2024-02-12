import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const disconnect = (): void => {
    prismaClient.$disconnect().catch(e => {
        console.error(e)
        process.exit(1)
    })
}

process.on('exit', disconnect)

export default prismaClient
