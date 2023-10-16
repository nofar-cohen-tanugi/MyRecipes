import { NextFunction, Request, Response } from "express";
import { AppError } from "./utils/appError";
import { globalErrorHandler } from "./controller/errorController";

const express = require('express');
const app = express();
const recipeRouter = require('./routes/recipeRoute.ts');
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('env'))
}

app.use(express.json());

app.use('/api/v1/recipes', recipeRouter);

// not found error
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.url} on this server`, 404));
})

// error handling middeware
app.use(globalErrorHandler);

module.exports = app;