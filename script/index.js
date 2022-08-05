import { getRecipes } from "./recipes.js";
import { search } from "./search/search.js";
import { searchState } from "./state.js";
import { searchAppliances, searchIngredients, searchUstensils } from "./tags/search-dropdowns.js";
import { ustensilsGenerate, applianceGenerate, ingredientsGenerate, recipeGenerate } from "./templates/index.js";

function init() {
    //Génération des recettes au premier chargement de la page
    recipeGenerate(getRecipes());
    applianceGenerate(getRecipes());
    ustensilsGenerate(getRecipes());
    ingredientsGenerate(getRecipes());

    //Fonction de recherche
    /* Gestion des ingrédients */
    const searchForm = document.querySelector(".form-control");
    searchForm.addEventListener("input", (e) => {
        searchState.updateSearchQuery(e.target.value.toLowerCase())
        search()
    })
    document.querySelector("#allIngredients").addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
            searchState.addIngredient(e.target.innerText);
            search();
        }
    })
    document.querySelector("#elementsSelection").addEventListener("click", (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.item == "ingredient") {
            searchState.removeIngredient(e.target.innerText);
            search();
        }
    })
    /* Gestion des appareils */
    document.querySelector("#allAppliances").addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
            searchState.addAppliance(e.target.innerText);
            search();
        }
    })
    document.querySelector("#elementsSelection").addEventListener("click", (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.item == "appliances") {
            searchState.removeAppliance(e.target.innerText);
            search();
        }
    })
    /* Gestion des ustensiles */
    document.querySelector("#allUstensils").addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
            searchState.addUstensil(e.target.innerText);
            search();
        }
    })
    document.querySelector("#elementsSelection").addEventListener("click", (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.item == "ustensils") {
            searchState.removeUstensil(e.target.innerText);
            search();
        }
    })

    // Recherche des ingrédients dans la liste
    document.querySelector("#ingredient-button").addEventListener("input", (e) => {
        searchIngredients(e.target.value, getRecipes());
    })
    document.querySelector("#appareils-button").addEventListener("input", (e) => {
        searchAppliances(e.target.value, getRecipes());
    })
    document.querySelector("#ustensiles-button").addEventListener("input", (e) => {
        searchUstensils(e.target.value, getRecipes());
    })
}

init();