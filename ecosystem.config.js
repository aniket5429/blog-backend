module.exports = {
    apps: [
        {
            name: 'Blog',
            script: 'npm',
            args: 'start',
            cwd: './build', // Change this to your build directory's path
            watch: true,
            env_production: {
                NODE_ENV: 'production',
                DATABASE_URL:
                    'postgresql://aniket:postgres!123@blog.postgres.database.azure.com:5432/ziffi?schema=public',
            },
        },
    ],
}
