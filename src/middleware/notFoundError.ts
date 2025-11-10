import { NextFunction,Request,Response } from "express";
import { ErrorWithStatus } from "../utils/errorWithStatus.js";

export const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorWithStatus('Resource not found', 404)); 
}

export default notFoundError;