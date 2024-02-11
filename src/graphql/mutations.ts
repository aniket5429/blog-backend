import blogService from "../services/blogService"

type BlogCreation = {
    title: string,
    content: string
}

type BlogUpdate = BlogCreation & { id: number}


export const Mutations = {
    createBlog: (parent: any, input: BlogCreation, context: any, info: any) => blogService.createBlog(input.title, input.content),
    updateBlog: (parent: any, input: BlogUpdate, context: any, info: any) => blogService.updateBlog(input.id, input.title, input.content)
}