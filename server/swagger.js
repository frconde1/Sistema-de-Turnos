import swaggerJsdoc from "swagger-jsdoc"

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SweetMedical API",
      version: "1.0.0",
      description: "Documentación de la API del TP",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./docs/swagger/*.yaml", "./routes/*.js", "./controller/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export default swaggerSpec