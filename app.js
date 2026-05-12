import express		from "express"
import router		from "./routes/router.js"
import errorHandler from "./errors/ErrorHandler.js"
import notFoundHandler from "./errors/NotFoundHandler.js"

const app = express()

app.use(express.json());
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app