export function ustensilsGenerate(recipes) {
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