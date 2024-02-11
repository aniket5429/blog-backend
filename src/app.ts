import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

const app: express.Application = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app as any, path: '/graphql'});
    app.listen({ port: process.env.PORT ?? 3000 }, () => {
        console.log(`Server ready at http://localhost:3000${apolloServer.graphqlPath}`);
    })
}

startServer();

export { apolloServer, app }