import blogService from '../services/blogService'

export const Queries = {
    blogs: async (_: any, { page, size }: { page: number; size: number }) =>
        await blogService.getBlogs(page, size),
    blog: async (_: any, { id }: { id: number }) =>
        await blogService.getPostById(id),
}
