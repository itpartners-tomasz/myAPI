
import { Prisma } from '../db.js';
import { ZodError } from 'zod';


export const errorHandler = (err: Error, req: any, res: any, next: any) => {

    console.error(`[API_ERROR] Path: ${req.path} | Message: ${err.message}`);

    if (err.message === 'Resource path not found') {
        return res.status(404).json({ message: 'Resource path not found' });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: err.issues.map((e) => ({
                error: e.message
            })),
        });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({ message: 'Invalid data provided' });
    }


    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Resource not found' });
        }
    }

    return res.status(500).json({ message: 'Internal Server Error' });
}

export default errorHandler;