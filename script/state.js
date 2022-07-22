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

    addIngredient(ingredient) {
        if (!this.state.ingredients.includes(ingredient)) {
            this.state.ingredients.push(ingredient)
        }
    }

    removeIngredient(ingredient) {
        const indexToDelete = this.state.ingredients.indexOf(ingredient);
        this.state.ingredients.splice(indexToDelete, 1);
    }
}

export const searchState = new SearchState()

// TODO : à supprimer
window.searchState = searchState
