export function applianceGenerate(recipes) {
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