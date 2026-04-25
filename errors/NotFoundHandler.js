import { NotFoundError } from "./Errors.js";

export default function notFoundHandler(req, res, next) {
	next(new NotFoundError(`Ruta ${req.originalUrl} no encontrada`))
}