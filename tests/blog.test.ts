// import { createTestClient } from 'apollo-server-testing'
import assert from 'assert'
import { apolloServer } from '../src/server'

// const { query } = createTestClient(apolloServer)

describe('Blog queries tests', () => {
    it('should return empty blogs when no blogs created', async () => {
        const result = await apolloServer.executeOperation({
            query: '{ blogs { id, title, content } }',
        })
        assert.equal(result.errors, undefined)
        console.log(result.data?.blogs)
        // assert.deepEqual(result.data.length, 1)
        // assert.deepEqual(result.data, { blogs: [] })
    })
})
