import mongoose from "mongoose";
import { IRecipe } from "./IRecipe.model";
//const slugify = require('slugify');
//const validator = require('validator')

const recipeSchema = new mongoose.Schema<IRecipe>({
    title: {
        type: String,
        unique: true,
        // validator
        required: [true, 'title is a required field'],
        maxlength: 50,
        //validate: [validator.isAlpha, "Title must only contain characters"]
    },
    ingredients: {
        type: String,
        required: [true, 'ingredients is a required field'],
        maxlength: 200
    },
    preparation: {
        type: String,
        required: [true, 'preparation is a required field'],
        maxlength: 300
    },
    picture: {
        type: String,
        required: false,
        maxlength: 100
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is a required field'],
        enum: {
            values: ['Easy', 'Medium', 'Difficult'],
            message: 'Difficulty us either: easy, medium, difficult'
        }
    },
    createdAt: {
        type: Date,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
}
    , {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// not in DB, just for DTO
// recipeSchema.virtual('addFiled').get(function () {
//     // this - current documnet
//     return this.title + "-------";
// });


// document middleware 
//run before the save and create command), save event
recipeSchema.pre('save', function (next) {
    this.isDeleted = false;
    this.createdAt = new Date(Date.now());
    next();
});

// recipeSchema.post('save', function (doc, next) {
//     next();
// });

//query middleware
// recipeSchema.pre(/^find/, function (next) {
//     //this.find({...})
//     next();
// })

//aggregation middleware
// recipeSchema.pre('aggregate', function (next) {
//     this.pipeline().unshift({ $match: { title: { eq: '...' } } })
//     next();
// })

const Recipe = mongoose.model('Recipe', recipeSchema);
Recipe.createIndexes();

module.exports = Recipe;
