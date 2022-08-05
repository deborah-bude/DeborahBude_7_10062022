export function tagGenerate(recipes) {
    // console.log('hello');
    const elementsSelection = document.getElementById("elementsSelection");
    const allElements = [];

    if (searchState.getState().ingredients.length === 0 &&
        searchState.getState().appliances.length === 0 &&
        searchState.getState().ustensils.length === 0) {
        elementsSelection.innerHTML = "";
    }

    if (searchState.getState().ingredients.length !== 0) {
        searchState.getState().ingredients.forEach(ingredient => {
            const ingredientList = `<li class="ingredient-item"><a class="dropdown-item" data-item="ingredient" href="#">${ingredient}</a></li>`;
            allElements.push(ingredientList)
        });
    }

    if (searchState.getState().appliances.length !== 0) {
        searchState.getState().appliances.forEach(appliance => {
            const applianceList = `<li class="appliance-item"><a class="dropdown-item" data-item="appliances" href="#">${appliance}</a></li>`;
            allElements.push(applianceList)
        });
    }

    if (searchState.getState().ustensils.length !== 0) {
        searchState.getState().ustensils.forEach(ustensil => {
            const ustensilList = `<li class="ustensil-item"><a class="dropdown-item" data-item="ustensils" href="#">${ustensil}</a></li>`;
            allElements.push(ustensilList)
        });
    }

    allElements.join('');
    elementsSelection.innerHTML = allElements;

    document.querySelector("#ingredient-button").value = "";
    document.querySelector("#appareils-button").value = "";
    document.querySelector("#ustensiles-button").value = "";
}