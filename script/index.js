import { getRecipes } from "./recipes.js";
import { searchState } from "./state.js";

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
    /* Gestion des appareils */
    document.querySelector("#allAppliances").addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
            searchState.addAppliance(e.target.innerText);
            search();
        }
    })
    document.querySelector("#appliancesSelection").addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
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
    document.querySelector("#ustensilsSelection").addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
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

/* Génération des différents parties du site */
function recipeGenerate(recipes) {
    const recipeList = document.getElementById("recipe-list");

    const recipeHtml = recipes.map(recipe => {
        const { name, time, ingredients, description } = recipe;

        //Génération liste ingrédient suivant ce qui est indiqué dans la base de données
        const ingredientsList = ingredients.map(recipeIngredient => {
            const { ingredient, quantity, unit } = recipeIngredient;
            let ingredientElement;
            if (unit && quantity) {
                ingredientElement = `<li><strong>${ingredient}</strong>: ${quantity} ${unit}</li>`;
            } else if (!unit && quantity) {
                ingredientElement = `<li><strong>${ingredient}</strong>: ${quantity}</li>`;
            } else {
                ingredientElement = `<li><strong>${ingredient}</strong></li>`;
            }
            return ingredientElement;
        });
        const ingredientshtml = ingredientsList.join('');

        //Couper la description au bout de 100 caractères pour éviter de l'avoir en entier
        function truncateDescription(desc, length = 100) {
            return desc.length <= length ? desc : desc.substring(0, length).trim() + '...'
        }

        //Template recette
        const recipeElement =
            `<div class="col">
                <div class="card h-100">
                    <div class="card-img-top"></div>
                    <div class="card-body">
                        <div class="d-flex flex-wrap justify-content-between">
                            <h5 class="card-title col-12 col-lg-8">${name}</h5>
                            <p class="card-text col-12 col-lg-4 text-end"><i class="bi bi-clock"></i> ${time} min</p>
                        </div>
                        <div class="d-flex flex-wrap justify-content-between">
                            <ul class="col-12 col-lg-6">${ingredientshtml}</ul>
                            <p class="col-12 col-lg-6">${truncateDescription(description)}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        return recipeElement;
    });
    //Intégration dans le html des recettes
    recipeList.innerHTML = recipeHtml.join('')
}

function ingredientsGenerate(recipes) {
    const integrationIngredients = document.getElementById("allIngredients");
    const ingredientsArray = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(allIngredients => {
            if (!ingredientsArray.includes(`<li><a class="dropdown-item" href="#">${allIngredients.ingredient}</a></li>`)) {
                let itemIngredient = `<li><a class="dropdown-item" href="#">${allIngredients.ingredient}</a></li>`;
                ingredientsArray.push(itemIngredient)
            }
        });
    });

    integrationIngredients.innerHTML = ingredientsArray.join('')
}

function ustensilsGenerate(recipes) {
    const integrationUstensils = document.getElementById("allUstensils");
    const ustensilsArray = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensils => {
            if (!ustensilsArray.includes(`<li><a class="dropdown-item" href="#">${ustensils}</a></li>`)) {
                let itemUstensil = `<li><a class="dropdown-item" href="#">${ustensils}</a></li>`;
                ustensilsArray.push(itemUstensil)
            }
        });
    });

    integrationUstensils.innerHTML = ustensilsArray.join('')
}

function applianceGenerate(recipes) {
    const integrationAppliances = document.getElementById("allAppliances");
    const appliancesArray = [];

    recipes.forEach(recipe => {
        if (!appliancesArray.includes(`<li><a class="dropdown-item" href="#">${recipe.appliance}</a></li>`)) {
            let itemAppliance = `<li><a class="dropdown-item" href="#">${recipe.appliance}</a></li>`;
            appliancesArray.push(itemAppliance)
        }
    });

    /*const result = recipes.map(recipe => `<li><a class="dropdown-item" href="#">${recipe.appliance}</a></li>`)
    const resultSansDoublons = [...new Set(result)];*/

    integrationAppliances.innerHTML = appliancesArray.join('')
}

/* Recherche des ingrédients / ustensiles / appareils dans la barre de recherche */
function searchIngredients(inputValue, recipes) {
    const integrationIngredients = document.getElementById("allIngredients");
    const ingredientsArray = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(allIngredients => {
            if (allIngredients.ingredient.toLowerCase().includes(inputValue.toLowerCase()) && !ingredientsArray.includes(`<li><a class="dropdown-item" href="#">${allIngredients.ingredient}</a></li>`)) {
                const itemIngredient = `<li><a class="dropdown-item" href="#">${allIngredients.ingredient}</a></li>`;
                ingredientsArray.push(itemIngredient)
            }
        });
    });

    integrationIngredients.innerHTML = ingredientsArray.join('');
}

function searchAppliances(inputValue, recipes) {
    const integrationAppliances = document.getElementById("allAppliances");
    const appliancesArray = [];

    recipes.forEach(recipe => {
        if (recipe.appliance.toLowerCase().includes(inputValue.toLowerCase()) && !appliancesArray.includes(`<li><a class="dropdown-item" href="#">${recipe.appliance}</a></li>`)) {
            const itemIngredient = `<li><a class="dropdown-item" href="#">${recipe.appliance}</a></li>`;
            appliancesArray.push(itemIngredient)
        }
    });

    integrationAppliances.innerHTML = appliancesArray.join('');
}

function searchUstensils(inputValue, recipes) {
    const integrationUstensils = document.getElementById("allUstensils");
    const ustensilsArray = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            if (ustensil.toLowerCase().includes(inputValue.toLowerCase()) && !ustensilsArray.includes(`<li><a class="dropdown-item" href="#">${ustensil}</a></li>`)) {
                const itemUstensil = `<li><a class="dropdown-item" href="#">${ustensil}</a></li>`;
                ustensilsArray.push(itemUstensil)
            }
        });
    });

    integrationUstensils.innerHTML = ustensilsArray.join('');
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
    const ingredientsSelection = document.getElementById("ingredientsSelection");
    const allIngredientsElement = []

    if (searchState.getState().ingredients.length === 0) {
        ingredientsSelection.innerHTML = ''
        return recipes;
    }

    let resultSearch = []

    searchState.getState().ingredients.forEach(ingredient => {
        const source = resultSearch.length === 0 ? recipes : resultSearch
        resultSearch = source.filter(recipe => {
            return recipe.ingredientsAsString.includes(ingredient);
        });


        const ingredientList = `<li class="ingredient-item"><a class="dropdown-item" href="#">${ingredient}</a></li>`;
        allIngredientsElement.push(ingredientList)
    });

    allIngredientsElement.join('');
    ingredientsSelection.innerHTML = allIngredientsElement;

    document.querySelector("#ingredient-button").value = "";

    return resultSearch;
}

/* Recherche filtre appareils */
function searchRecipesByAppliances(recipes) {
    const appliancesSelection = document.getElementById("appliancesSelection");
    const allUstensilsElement = []

    if (searchState.getState().appliances.length === 0) {
        appliancesSelection.innerHTML = ''
        return recipes;
    }

    let resultSearch = []

    searchState.getState().appliances.forEach(appliance => {
        const source = resultSearch.length === 0 ? recipes : resultSearch
        resultSearch = source.filter(recipe => {
            return recipe.appliance.includes(appliance);
        });


        const applianceList = `<li class="appliance-item"><a class="dropdown-item" href="#">${appliance}</a></li>`;
        allUstensilsElement.push(applianceList)
    });

    allUstensilsElement.join('');
    appliancesSelection.innerHTML = allUstensilsElement;

    document.querySelector("#appareils-button").value = "";

    return resultSearch;
}

/* Recherche filtre appareils */
function searchRecipesByUstensils(recipes) {
    const ustensilsSelection = document.getElementById("ustensilsSelection");
    const allUstensilsElement = []

    if (searchState.getState().ustensils.length === 0) {
        ustensilsSelection.innerHTML = ''
        return recipes;
    }

    let resultSearch = []

    searchState.getState().ustensils.forEach(ustensil => {
        const source = resultSearch.length === 0 ? recipes : resultSearch
        resultSearch = source.filter(recipe => {
            return recipe.ustensils.includes(ustensil);
        });


        const ustensilList = `<li class="ustensil-item"><a class="dropdown-item" href="#">${ustensil}</a></li>`;
        allUstensilsElement.push(ustensilList)
    });

    allUstensilsElement.join('');
    ustensilsSelection.innerHTML = allUstensilsElement;

    document.querySelector("#ustensiles-button").value = "";

    return resultSearch;
}

/* Recherche générale combinant la recherche textuel, par ingrédients, appareils, ustensiles */
function search() {
    const recipesFromTextSearch = searchRecipes(getRecipes())
    const recipesFromIngredientsSearch = searchRecipesByIngredients(recipesFromTextSearch)
    const recipesFromAppliancesSearch = searchRecipesByAppliances(recipesFromIngredientsSearch)
    const recipesFromUstensilsSearch = searchRecipesByUstensils(recipesFromAppliancesSearch)

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

init();