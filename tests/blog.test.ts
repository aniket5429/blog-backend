// import { createTestClient } from 'apollo-server-testing'
import assert from 'assert'
import { apolloServer } from '../src/server'
import { type GraphQLResponse } from 'apollo-server-core'
import prismaClient from '../src/services/prismaService'
import blogs from '../src/data/blogData'

const fetchBlogs = async (
    page: number,
    size: number,
): Promise<GraphQLResponse> => {
    return await apolloServer.executeOperation({
        query: `query FetchBlogs($page: Int!, $size: Int){ blogs(page: $page, size: $size) { id, title, content } }`,
        variables: { page, size },
    })
}

const fetchBlog = async (id: number): Promise<GraphQLResponse> => {
    return await apolloServer.executeOperation({
        query: `query FetchBlog($id: Int!){ blog(id: $id) { id, title, content } }`,
        variables: { id },
    })
}

describe('Create blogs', () => {
    afterAll(async () => {
        await prismaClient.blog.deleteMany()
    })

    it('should create a blog', async () => {
        const { title, content } = blogs[0]
        const response = await apolloServer.executeOperation({
            query: `mutation insertBlog($title: String!, $content: String!) { createBlog(title: $title, content: $content)  { id, title, content } }`,
            variables: { title, content },
        })
        assert.equal(response.errors, undefined)
        assert.equal(response.data?.createBlog.title, title)
        assert.equal(response.data?.createBlog.content, content)
        expect(response.data?.createBlog.id).not.toBe(null)
        expect(response.data?.createBlog.id).not.toBe(undefined)
    })

    it('should return error if title is not provided', async () => {
        const { content } = blogs[0]
        const response = await apolloServer.executeOperation({
            query: `mutation insertBlog($content: String!) { createBlog(content: $content)  { id, title, content } }`,
            variables: { content },
        })
        assert.notEqual(response.errors, undefined)
        expect(response.errors?.length).toBe(1)
    })

    it('should return error if content is not provided', async () => {
        const { title } = blogs[0]
        const response = await apolloServer.executeOperation({
            query: `mutation insertBlog($title: String!) { createBlog(title: $title)  { id, title, content } }`,
            variables: { title },
        })
        assert.notEqual(response.errors, undefined)
        expect(response.errors?.length).toBe(1)
    })

    it('should return error if no data is provided', async () => {
        const response = await apolloServer.executeOperation({
            query: `mutation insertBlog { createBlog  { id, title, content } }`,
        })
        assert.notEqual(response.errors, undefined)
        expect(response.errors?.length).toBe(2)
    })
})

describe('Update blogs', () => {
    beforeEach(async () => {
        await prismaClient.blog.deleteMany()
    })
    it('should update a blog', async () => {
        const { title, content } = blogs[0]
        const response = await apolloServer.executeOperation({
            query: `mutation insertBlog($title: String!, $content: String!) { createBlog(title: $title, content: $content)  { id, title, content } }`,
            variables: { title, content },
        })
        const { id } = response.data?.createBlog
        const newTitle = 'New Title'
        const newContent = 'New Content'
        const updateResponse = await apolloServer.executeOperation({
            query: `mutation updateBlog($id: Int!, $title: String!, $content: String!) { updateBlog(id: $id, title: $title, content: $content)  { id, title, content } }`,
            variables: { id, title: newTitle, content: newContent },
        })
        assert.equal(updateResponse.errors, undefined)
        assert.equal(updateResponse.data?.updateBlog.title, newTitle)
        assert.equal(updateResponse.data?.updateBlog.content, newContent)
        expect(updateResponse.data?.updateBlog.id).toBe(id)
    })

    it('should return error if id is not provided', async () => {
        const { title, content } = blogs[0]
        await apolloServer.executeOperation({
            query: `mutation insertBlog($title: String!, $content: String!) { createBlog(title: $title, content: $content)  { id, title, content } }`,
            variables: { title, content },
        })
        const newTitle = 'New Title'
        const newContent = 'New Content'
        const updateResponse = await apolloServer.executeOperation({
            query: `mutation updateBlog($title: String!, $content: String!) { updateBlog(title: $title, content: $content)  { id, title, content } }`,
            variables: { title: newTitle, content: newContent },
        })
        assert.notEqual(updateResponse.errors, undefined)
        expect(updateResponse.errors?.length).toBe(1)
    })

    it('should return error if no data is provided', async () => {
        const { title, content } = blogs[0]
        await apolloServer.executeOperation({
            query: `mutation insertBlog($title: String!, $content: String!) { createBlog(title: $title, content: $content)  { id, title, content } }`,
            variables: { title, content },
        })
        const updateResponse = await apolloServer.executeOperation({
            query: `mutation updateBlog { updateBlog  { id, title, content } }`,
        })
        assert.notEqual(updateResponse.errors, undefined)
        expect(updateResponse.errors?.length).toBe(1)
    })

    it('should return error if id is not valid', async () => {
        const { title, content } = blogs[0]
        await apolloServer.executeOperation({
            query: `mutation insertBlog($title: String!, $content: String!) { createBlog(title: $title, content: $content)  { id, title, content } }`,
            variables: { title, content },
        })
        const newTitle = 'New Title'
        const newContent = 'New Content'
        const updateResponse = await apolloServer.executeOperation({
            query: `mutation updateBlog($id: Int!, $title: String!, $content: String!) { updateBlog(id: $id, title: $title, content: $content)  { id, title, content } }`,
            variables: { id: 100, title: newTitle, content: newContent },
        })
        assert.notEqual(updateResponse.errors, undefined)
        expect(updateResponse.errors?.length).toBe(1)
    })
})

describe('Get all blogs', () => {
    beforeEach(async () => {
        await prismaClient.blog.deleteMany()
    })
    it('should return empty blogs when no blogs created', async () => {
        const result = await fetchBlogs(1, 10)
        assert.equal(result.errors, undefined)
        expect(result.data?.blogs.length).toBe(0)
        assert.deepEqual(result.data, { blogs: [] })
    })

    it('should return all blogs when blogs are created', async () => {
        await prismaClient.blog.createMany({ data: blogs })
        const result = await fetchBlogs(1, 10)
        assert.equal(result.errors, undefined)
        expect(result.data?.blogs.length).toBe(10)
    })

    it('should return 5 blogs when page is 1 and size is 5', async () => {
        await prismaClient.blog.createMany({ data: blogs })
        const result = await fetchBlogs(1, 5)
        assert.equal(result.errors, undefined)
        expect(result.data?.blogs.length).toBe(5)
    })

    it('should return All blogs when page is 1 and size is lenght of blogs', async () => {
        await prismaClient.blog.createMany({ data: blogs })
        const result = await fetchBlogs(1, blogs.length)
        assert.equal(result.errors, undefined)
        expect(result.data?.blogs.length).toBe(blogs.length)
    })
})

describe('Get a particular blog', () => {
    beforeEach(async () => {
        await prismaClient.blog.deleteMany()
    })
    it('should give an error when blog is not created', async () => {
        const result = await fetchBlog(1)
        assert.equal(result.errors, undefined)
        expect(result.data?.blog).toBe(null)
    })

    it('should return the blog when blog is created', async () => {
        await prismaClient.blog.createMany({ data: blogs })
        const insertedBlog = await prismaClient.blog.findFirstOrThrow()
        const result = await fetchBlog(insertedBlog.id)
        const expectedResult = {
            id: insertedBlog.id,
            title: insertedBlog.title,
            content: insertedBlog.content,
        }
        assert.equal(result.errors, undefined)
        assert.deepEqual(result.data, { blog: expectedResult })
    })
})
