import { app, apolloServer } from './server'

const startServer = async (): Promise<void> => {
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app as any, path: '/graphql' })
    app.listen({ port: process.env.PORT ?? 3000 }, () => {
        console.log(
            `Server ready at http://localhost:3000${apolloServer.graphqlPath}`,
        )
    })
}

startServer().catch(err => {
    console.error(err)
})
