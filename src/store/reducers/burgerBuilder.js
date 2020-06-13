import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState = {
    totalPrice: 4,
    pageError: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    bacon: 0.7,
    meat: 1.5
};
const addIngredient = ( state , action ) => {
    const updatedIngredient = { [action.ingredient] : state.ingredients[action.ingredient]  + 1 };
    const updatedIngredients = updateObject( state.ingredients,  updatedIngredient );
    const updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient];
    return updateObject(state , { 
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        building: true,
    });
}
const removeIngredient = ( state , action ) => {
    const updatedIngredient = { [action.ingredient] : state.ingredients[action.ingredient]  - 1 };
    const updatedIngredients = updateObject( state.ingredients,   updatedIngredient  );
    const updatedPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient];
    return updateObject(state , { 
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        building: true,
    });
}
const setIngredients = ( state, action ) => {
    return updateObject(state , {
        ingredients: action.ingredients,
        totalPrice: 4,
        pageError: false,
        building: false,
    })
};

const errorIngredients= ( state, action ) => {
    return updateObject( state, { pageError  : true })
}

const reducer = ( state = intialState , action ) => {
    switch( action.type ) {
        case( actionTypes.ADD_INGREDIENTS ) :
            return addIngredient( state, action )
        case( actionTypes.REMOVE_INGREDIENTS ) :
            return removeIngredient( state, action );
        case ( actionTypes.SET_INGREDIENTS ): 
            return setIngredients( state, action );
        case ( actionTypes.ERROR_INGREDIENTS ) :
            return errorIngredients( state, action )
        default : 
        return state
    }
};
export default reducer;

