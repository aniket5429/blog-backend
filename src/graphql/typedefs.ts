import { gql } from 'apollo-server-express'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
    type Blog {
        id: Int!
        title: String
        content: String
    }
    type Query {
        blogs: [Blog!]!
        blog(id: Int!): Blog
    }

    type Mutation {
        createBlog(title: String!, content: String!): Blog!
        updateBlog(id: Int!, title: String, content: String): Blog!
    }
`
