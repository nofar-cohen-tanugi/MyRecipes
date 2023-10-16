export class AppError extends Error {

    public statusCode: number;
    public status?: string;
    public isOperational?: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = `${this.statusCode}`.startsWith('4') ? 'failed' : 'error';
        // operational error
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}