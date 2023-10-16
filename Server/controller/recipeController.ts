import { NextFunction, Request, Response } from 'express';
import { APIFeature } from '../utils/apiFeatures';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import mongoose from 'mongoose';
import { IRecipe } from '../model/Recipe/IRecipe.model';
const Recipe: mongoose.Model<IRecipe> = require('../model/Recipe/RecipeModel.model');

// Controller methods
module.exports = {
    getAllRecipes: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feature = new APIFeature(Recipe.find(), req.query).filter().sort().paginate();
        const recipes = await feature.query;

        return res.status(201).json({
            status: 'success',
            message: 'Success to get all recipes',
            count: recipes?.length,
            data: recipes
        });
    }),
    getRecipeById: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return next(new AppError('No recipe found with that ID', 401))
        }
        return res.status(201).json({
            status: 'success',
            message: 'Success to get the recipe',
            data: recipe
        });

    }),
    createRecipe: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const newRcipe = await Recipe.create(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'A new recipe added!',
            data: newRcipe
        });
    }),

    updateRecipe: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const existRcipe = await Recipe.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true });

        if (!existRcipe) {
            return next(new AppError('No recipe found with that ID', 401))
        }
        return res.status(201).json({
            status: 'success',
            message: 'The recipe updated!',
            data: existRcipe
        });
    }),

    deleteRecipe: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const existRcipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!existRcipe) {
            const e = new AppError('No recipe found with that ID', 401);
            console.log(e);

            return next(new AppError('No recipe found with that ID', 401))
        }
        return res.status(201).json({
            status: 'success',
            message: 'The recipe deleted!',
            data: existRcipe
        });
    }),

    deleteAllRecipe: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await Recipe.deleteMany();

        return res.status(201).json({
            status: 'success',
            message: 'All recipes deleted!',
            data: 'all'
        });
    })
}