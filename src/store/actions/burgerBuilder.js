import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ( type ) => {
    return {
        type: actionTypes.ADD_INGREDIENTS ,
        ingredient: type
    }
}
export const removeIngredient = ( type ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS ,
        ingredient: type
    }
}
export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}
export const setErrorIngredients = ( ingredients ) => {
    return {
        type: actionTypes.ERROR_INGREDIENTS,
    }
}

export const initIngredients = ( ) => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response =>{
                dispatch( setIngredients( response.data ) );
            })
            // You Have To Set the Catch method to handle errors because if you don't add it
            // the .Then method Still Excutes anyway.
            .catch(error => {
                dispatch( setErrorIngredients( ) );
            });
    }
}