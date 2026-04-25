import { AppError } from "./Errors.js";

export default function errorHandler (err, req, res, next){
	if (res.headersSent) 
        return next(err);

	console.error({
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        error: {
            name: err.name,
            message: err.message,
        },
		stack: err.stack
    })

    if (err instanceof AppError) {
        return res.status(err.statusCode).json(
			{
        	    status: 	err.name,
        	    message: 	err.message,
        	    timestamp: 	err.timeStamp.toString(),
        	}
		) 
    }

    return res.status(500).json({
        status: "Error",
        message: "Error interno del servidor",
        timestamp: new Date().toISOString(),
    })
}