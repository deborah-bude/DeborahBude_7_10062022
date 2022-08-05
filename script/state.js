/*export const searchState = {
 query: '',
 ingredients: [],
 ustensils: [],
 appliances: []   
}*/

class SearchState {
    constructor() {
        this.state = {
            query: '',
            ingredients: [],
            ustensils: [],
            appliances: []   
        }
    }

    getState() {
        return this.state
    }

    updateSearchQuery(query) {
        this.state.query = query
    }

    /**
     * 
     * @param {String} item 
     * @param {'ingredients' | 'ustensils' | 'appliances'} typeTag 
     */
    addTag(item, typeTag = 'ingredients') {
        if (!this.state[typeTag].includes(item)) {
            this.state[typeTag].push(item)
        }
    }

    //Mise à jour des ingrédients
    addIngredient(ingredient) {
        if (!this.state.ingredients.includes(ingredient)) {
            this.state.ingredients.push(ingredient)
        }
    }
    removeIngredient(ingredient) {
        const indexToDelete = this.state.ingredients.indexOf(ingredient);
        this.state.ingredients.splice(indexToDelete, 1);
    }

    //Mise à jour des appareils
    addAppliance(appliance) {
        if (!this.state.appliances.includes(appliance)) {
            this.state.appliances.push(appliance)
        }
    }
    removeAppliance(appliance) {
        const indexToDelete = this.state.appliances.indexOf(appliance);
        this.state.appliances.splice(indexToDelete, 1);
    }

    //Mise à jour des unstensiles
    addUstensil(ustensil) {
        if (!this.state.ustensils.includes(ustensil)) {
            this.state.ustensils.push(ustensil)
        }
    }
    removeUstensil(ustensil) {
        const indexToDelete = this.state.ustensils.indexOf(ustensil);
        this.state.ustensils.splice(indexToDelete, 1);
    }
}

export const searchState = new SearchState()

// TODO : à supprimer
window.searchState = searchState
