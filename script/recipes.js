import { recipes } from "./recipe.js";

const allRecipes = recipes.map((recipe) => {
    return {
        ...recipe,
        ingredientsAsString: recipe.ingredients.map(i => i.ingredient).join(' '),
    }
})

export function getRecipes() {
    return allRecipes
}
