import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({ error: "Something went wrong" });
};
