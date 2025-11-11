import { NextFunction,Request,Response } from "express";

export const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    next(new Error('Resource path not found')); 
}

export default notFoundError;