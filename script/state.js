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
        this.state.ingredients.push(ingredient)
        // search()
    }

    removeIngredient(ingredient) {

    }
}

export const searchState = new SearchState()
