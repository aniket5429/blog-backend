import blogService from '../services/blogService'
export const Queries = {
    blogs: blogService.getBlogs,
    blog: ( parent: any, {id}: {id: number}, context: any, info: any ) => blogService.getPostById(id)
}
