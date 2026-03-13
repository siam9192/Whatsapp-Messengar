import { NextFunction, Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({
		success: false,
		message: "API endpoint not found",
		path: req.originalUrl,
		method: req.method,
	});
};

export default notFoundHandler;
