import blogService from '../services/blogService'
export const Queries = {
    blogs: async () => await blogService.getBlogs(),
    blog: async (
        parent: any,
        { id }: { id: number },
        context: any,
        info: any,
    ) => await blogService.getPostById(id),
}
