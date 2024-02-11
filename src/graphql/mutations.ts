import blogService from '../services/blogService'

interface BlogCreation {
    title: string
    content: string
}

type BlogUpdate = BlogCreation & { id: number }

export const Mutations = {
    createBlog: async (
        parent: any,
        input: BlogCreation,
        context: any,
        info: any,
    ) => await blogService.createBlog(input.title, input.content),
    updateBlog: async (
        parent: any,
        input: BlogUpdate,
        context: any,
        info: any,
    ) => await blogService.updateBlog(input.id, input.title, input.content),
}
