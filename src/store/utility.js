export const updateIngredient = ( state , updatedIngredient, updatedPrice ) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            ...updatedIngredient,
        },
        ...updatedPrice,
    }
}

export const updateObject = ( oldObject , updatedObject ) => {
    return {
        ...oldObject,
        ...updatedObject,
    }
}
