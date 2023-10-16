import express from 'express';
const recipeController = require('../controller/recipeController');
const router = express.Router();

router.route('/')
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipe)
    .delete(recipeController.deleteAllRecipe);

router.route('/:id')
    .get(recipeController.getRecipeById)
    .put(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;
