import {prismaClient} from '../services/prismaService';

const blogService = {
    async getBlogs() {
        return await prismaClient.blog.findMany();
    },
    
    async getPostById(id: number) {
        return await prismaClient.blog.findUnique({
            where: { id }
        });
    },

    async createBlog(title: string, content: string) {
        return await prismaClient.blog.create({
            data: {
                title,
                content
            }
        });
    },

    async updateBlog(id: number, title: string, content: string) {
        return await prismaClient.blog.update({
            where: { id },
            data: {
                title,
                content
            }
        });
    }
}

export default blogService;