import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { CastError } from "mongoose";
import { MongoError } from 'mongodb';

const handleCastErrorDB = (path: Pick<CastError, 'path'>, value: Pick<CastError, 'value'>) => {
    const message = `Invalid ${path}: ${value}`
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (value: string) => {
    console.log("handleDuplicateFieldsDB");
    const message = `Duplicate filed value: ${value}, please use another value`
    return new AppError(message, 400);
}

const sendErrorDev = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err: AppError, res: Response) => {
    if (err?.isOperational) {
        res.status(err?.statusCode).json({
            status: err?.status,
            message: err?.message,
        });
    }
    // programming or other unknown error
    else {
        console.error('ERROR 😆', err)
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
}

export const globalErrorHandler = (err: AppError | CastError | MongoError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    err = {
        ...err,
        statusCode: 'statusCode' in err ? err.statusCode : 500,
        status: 'status' in err ? err.status : 'error',
        name: err.name,
        code: 'code' in err ? err.code : undefined
    };

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        var error = { ...err };
        if (error?.name == 'CastError' && 'path' in error && 'value' in error) {
            error = handleCastErrorDB(error?.path as Pick<CastError, "path">, error.value as Pick<CastError, "value">);
        }
        if (error.code && error.code === 11000 &&
            'keyValue' in error && error.keyValue && typeof error.keyValue === 'object'
            && 'title' in error.keyValue && error.keyValue.title && typeof error.keyValue.title === 'string') {
            error = handleDuplicateFieldsDB(error.keyValue.title);
        }
        if (error)
            sendErrorProd(error ?? err, res);
    }
}