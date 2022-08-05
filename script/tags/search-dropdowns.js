/* Recherche des ingrédients / ustensiles / appareils dans la barre de recherche */
export function searchIngredients(inputValue, recipes) {
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

export function searchAppliances(inputValue, recipes) {
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

export function searchUstensils(inputValue, recipes) {
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