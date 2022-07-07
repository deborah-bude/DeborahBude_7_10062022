import { getRecipes } from "./recipes.js";

function init() {
    //Génération des recettes au premier chargement de la page
    recipeGenerate(getRecipes());
    applianceGenerate(getRecipes());
    ustensilsGenerate(getRecipes());
    ingredientsGenerate(getRecipes());

    //Fonction de recherche
    const searchForm = document.querySelector(".form-control");
    searchForm.addEventListener("input", (e) => searchRecipe(searchForm))

    searchByIngredients();
}

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

function searchRecipe(searchForm) {
    //Regénération de l'ensemble des recettes si deux lettres ou moins est tapé dans la barre de recherche
    if (searchForm.value.length < 3) {
        recipeGenerate(getRecipes());
        return;
    }

    const searchValueLowerCase = searchForm.value.toLowerCase()

    //Boucle pour fouiller l'ensemble des recettes et trouver les recettes correspondant à la recherche
    const resultSearch = getRecipes().filter(recipe => {
        return recipe.name.toLowerCase().includes(searchValueLowerCase)
            || recipe.ingredientsAsString.toLowerCase().includes(searchValueLowerCase)
            || recipe.description.toLowerCase().includes(searchValueLowerCase);
    });

    recipeGenerate(resultSearch);
    applianceGenerate(resultSearch);
    ustensilsGenerate(resultSearch);
    ingredientsGenerate(resultSearch);

    searchByIngredients();
}

function searchByIngredients() {
    const elementSelection = document.getElementById("elementSelection");
    const allIngredients = document.getElementById("allIngredients");

    const allIngredientsList = document.querySelectorAll("#allIngredients li");
    const allAppliancesList = document.querySelectorAll("#allAppliances li");
    const allUstensilsList = document.querySelectorAll("#allUstensils li");

    allIngredientsList.forEach(ingredientList => {
        ingredientList.addEventListener("click", () => {
            elementSelection.appendChild(ingredientList);

            const elementSelectionList = document.querySelectorAll("#elementSelection li");

            elementSelectionList.forEach(elementList => {
                elementList.addEventListener("click", () => {
                    allIngredients.appendChild(elementList);
                }) 
            });
        })
    });
}

init();

