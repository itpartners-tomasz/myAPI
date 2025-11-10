import { ErrorWithStatus } from '../utils/errorWithStatus.js';
import { Prisma } from '../db.js';


export const errorHandler = (err: ErrorWithStatus | Error, req: any, res: any, next: any) => {

    console.error(`[API_ERROR] Path: ${req.path} | Message: ${err.message}`);

    if (err instanceof ErrorWithStatus && err.status) {
        return res.status(err.status).json({ message: err.message || 'Internal Server Error' });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({ message: 'Invalid data provided'});
    }


    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Resource not found' });
        }
    }

    return res.status(500).json({ message: 'Internal Server Error' });
}

export default errorHandler;