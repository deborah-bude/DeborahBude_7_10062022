/* Génération des différents parties du site */
export function recipeGenerate(recipes) {
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