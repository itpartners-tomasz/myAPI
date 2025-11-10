import { ErrorWithStatus } from '../utils/errorWithStatus.js';

export default function errorHandler(err: ErrorWithStatus | Error, req: any, res: any, next: any) {
    if(err instanceof ErrorWithStatus && err.status) {
        res.status(err.status).json({ message: err.message || 'Internal Server Error' });
    }
    if(err instanceof Error) {
        res.status(400).json({ message: err.message || 'Error parsing request' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
}