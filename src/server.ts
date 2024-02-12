import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/typedefs'
import { resolvers } from './graphql/resolvers'

const app: express.Application = express()
const apolloServer = new ApolloServer({ typeDefs, resolvers })

export { apolloServer, app }
