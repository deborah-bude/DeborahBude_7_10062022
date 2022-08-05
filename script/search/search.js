import { getRecipes } from "../recipes.js";
import { searchState } from "../state.js";
import { searchAppliances, searchIngredients, searchUstensils } from "../tags/search-dropdowns.js";
import { applianceGenerate, ingredientsGenerate, recipeGenerate, ustensilsGenerate, tagGenerate } from "../templates/index.js";

/* Recherche générale combinant la recherche textuel, par ingrédients, appareils, ustensiles */
export function search() {
    const recipesFromTextSearch = searchRecipes(getRecipes())
    const recipesFromIngredientsSearch = searchRecipesByIngredients(recipesFromTextSearch)
    const recipesFromAppliancesSearch = searchRecipesByAppliances(recipesFromIngredientsSearch)
    const recipesFromUstensilsSearch = searchRecipesByUstensils(recipesFromAppliancesSearch)

    tagGenerate();

    const resultFinal = recipesFromUstensilsSearch;
    recipeGenerate(resultFinal);
    applianceGenerate(resultFinal);
    ustensilsGenerate(resultFinal);
    ingredientsGenerate(resultFinal);

    document.querySelector("#ingredient-button").addEventListener("input", (e) => {
        searchIngredients(e.target.value, resultFinal);
    })
    document.querySelector("#appareils-button").addEventListener("input", (e) => {
        searchAppliances(e.target.value, resultFinal);
    })
    document.querySelector("#ustensiles-button").addEventListener("input", (e) => {
        searchUstensils(e.target.value, resultFinal);
    })
}


/* Recherche textuel */
function searchRecipes(recipes) {
    const state = searchState.getState();
    const query = state.query;

    if (query.length < 3) {
        return recipes;
    }

    const queryLowerCase = query.toLowerCase()

    const resultSearch = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(queryLowerCase)
            || recipe.ingredientsAsString.toLowerCase().includes(queryLowerCase)
            || recipe.description.toLowerCase().includes(queryLowerCase);
    });

    return resultSearch;
}

/* Recherche filtre ingrédients */
function searchRecipesByIngredients(recipes) {

    if (searchState.getState().ingredients.length === 0) {
        return recipes;
    }

    let resultSearch = []

    searchState.getState().ingredients.forEach(ingredient => {
        const source = resultSearch.length === 0 ? recipes : resultSearch
        resultSearch = source.filter(recipe => {
            return recipe.ingredientsAsString.includes(ingredient);
        });
    });

    return resultSearch;
}

/* Recherche filtre appareils */
function searchRecipesByAppliances(recipes) {

    if (searchState.getState().appliances.length === 0) {
        return recipes;
    }

    let resultSearch = []

    searchState.getState().appliances.forEach(appliance => {
        const source = resultSearch.length === 0 ? recipes : resultSearch
        resultSearch = source.filter(recipe => {
            return recipe.appliance.includes(appliance);
        });
    });

    return resultSearch;
}

/* Recherche filtre appareils */
function searchRecipesByUstensils(recipes) {

    if (searchState.getState().ustensils.length === 0) {
        return recipes;
    }

    let resultSearch = []

    searchState.getState().ustensils.forEach(ustensil => {
        const source = resultSearch.length === 0 ? recipes : resultSearch
        resultSearch = source.filter(recipe => {
            return recipe.ustensils.includes(ustensil);
        });
    });

    return resultSearch;
}