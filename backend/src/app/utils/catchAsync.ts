import { RequestHandler } from "express";

export function catchAsync(func: RequestHandler): RequestHandler {
  return (req, response, next) => {
    Promise.resolve(func(req, response, next)).catch((err) => {
      next(err);
    });
  };
}
