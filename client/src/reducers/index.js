export const initialState = {
    recipes: [],
    allRecipes: [],
    details: [],
    diets: []
}

console.log('esto es el estado "diets"', initialState.diets);

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }
            
        case 'FILTER_BY_DIET':
            const allrecipes = state.allRecipes
            console.log(allrecipes)

            const dietfilter = action.payload === 'All' ? allrecipes : allrecipes.filter(tt => tt.diets.includes(action.payload))
            console.log(action.payload);
            console.log(dietfilter)
            return {
                ...state,
                recipes: dietfilter
            }

        case 'ORDER_BY_NAME':
            let orderN = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()) {
                        return -1
                    }
                    return 0
                }) : state.recipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipes: orderN

            }

        case 'ORDER_POINTS':
            let order = action.payload === 'menormayor' ?
                state.recipes.sort(function (a, b) {
                    if (a.spoonacularScore > b.spoonacularScore) {
                        return 1
                    }
                    if (b.spoonacularScore > a.spoonacularScore) {
                        return -1
                    }
                    return 0
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.spoonacularScore > b.spoonacularScore) {
                        return -1
                    }
                    if (b.spoonacularScore > a.spoonacularScore) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipes: order
            }

        case 'GET_NAME':
            return {
                ...state,
                recipes: action.payload
            }

        case 'GET_ID':
            return {
                ...state,
                details: action.payload
            }

        case 'GET_DIETS':
            // console.log('action.payload',action.payload);
            return {
                ...state,
                diets: action.payload
            }

        case 'POST_RECIPE':
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default rootReducer;