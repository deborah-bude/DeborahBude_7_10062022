export function ingredientsGenerate(recipes) {
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