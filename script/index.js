import { recipes as allRecipes } from "./recipe.js";

function init() {
    //Génération des recettes au premier chargement de la page
    recipeGenerate(allRecipes);

    //Fonction de recherche
    const searchForm = document.querySelector(".form-control");
    searchForm.addEventListener("input", (e) => searchRecipe(searchForm))
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

function searchRecipe(searchForm) {
    //Regénération de l'ensemble des recettes si deux lettres ou moins est tapé dans la barre de recherche
    if (searchForm.value.length <= 2) {
        recipeGenerate(allRecipes);
        return;
    }

    //Tableau comprenant l'ensemble des recettes de la recherche
    let resultSearch = [];

    //Boucle pour fouiller l'ensemble des recettes
    allRecipes.forEach(recipe => {
        //Valeur du champs de recherche de l'input mise en minuscule pour éviter que la case influe sur la recherche
        //Sinon certaines recettes ne s'afficheront pas suivant la casse utilisée pour la recherche 
        const searchValueLowerCase = searchForm.value.toLowerCase()

        //Valeur true/false pour valider si la recette actuelle (recipe) est bien comprise dans la recherche effectué
        //En faisant la recherche avec juste le nom, je n'ai pas eu besoin de tout cela et je faisais juste un push dans le tableau "resultSearch" de la recette
        let search = false;

        //Boucle pour permettre de comparer chaque ingrédient de la recette à la valeur, en même temps que le nom et la description
        recipe.ingredients.forEach(ingredientElement => {
            //if pour comparer le nom de la recette, chaques ingredients de la recette et la description quand la boucle de lance
            //Tout ça en mettant ces valeurs en minuscule pour éviter que cela perturbe la recherche avec la casse utilisé
            if (recipe.name.toLowerCase().includes(searchValueLowerCase)
                || ingredientElement.ingredient.toLowerCase().includes(searchValueLowerCase)
                || recipe.description.toLowerCase().includes(searchValueLowerCase)) {
                //Valeur "search" créé car par rapport à cette boucle vu qu'il faut aussi regarder si chaque ingrédient correspond à la recherche ou non
                //A chaque boucle où on peut voir un ingrédient, il peut y avoir un redit par rapport à l'ingrédient précédent
                //C'est pour éviter les doublons dans l'affichage des recettes
                search = true;
            }
        });

        //Mise de la recette (recipe) dans le tableau de résultat des recherches si elle correspond bien à ce que l'utilisateur recherche
        if (search === true) {
            resultSearch.push(recipe);
        }
    });

    //Regénération de la liste des recettes à afficher en dessous
    recipeGenerate(resultSearch);
}

init();