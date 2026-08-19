import express		from "express"
import router		from "./routes/router.js"
import errorHandler from "./errors/ErrorHandler.js"
import notFoundHandler from "./errors/NotFoundHandler.js"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger.js"
import cors from "cors"

const mongoSanitizer = require('express-mongo-sanitize');

const app = express()

app.use(cors())
app.use(express.json());
app.use(mongoSanitizer());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app
