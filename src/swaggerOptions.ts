const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Tasks App',
      version: '1.0.0',
      description: 'Tasks CRUD'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT}` }
    ]
  },
  apis: ['./src/routes/*.ts']
}

export default swaggerOptions
