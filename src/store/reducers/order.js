import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState = {
    orders: [ ],
    fetchedOrders: [ ] ,
    ordersLoading: false,
    purchased: false,
    deleting: false,
    deleted: false,
};

const purchaseBurgerInit = ( state, action ) => {
    return updateObject( state, { purchased: false } )
}
const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { ordersLoading: true } )
}
const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = {
        ...action.order,
        id: action.orderId
    }
    return updateObject( state, { 
        orders: state.orders.concat( newOrder ),
        ordersLoading: false,
        purchased: true, } );
}
const purchaseBurgerFailed = ( state, action ) => {
    return updateObject( state, { ordersLoading: false, } )
}
const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { ordersLoading: true, } )
}
const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, { 
        ordersLoading: false,
        fetchedOrders : action.orders, } )
}
const fetchOrdersFailed = ( state, action ) => {
    return updateObject( state, { ordersLoading: false, } )
}
const deleteOrdersStart = ( state, action ) => {
    return updateObject( state, { 
        deleting: true,
        deleted: false, } );
}
const deleteOrdersSuccess = ( state, action ) => {
    const updatedArr = state.fetchedOrders.filter( ord   => {
                return ord.id !== action.orderId ;
            } );            
    return updateObject( state, {
        fetchedOrders: updatedArr,
        deleted: true,
    } )
}
const deleteOrdersFailed = ( state, action ) => {
    return updateObject( state, {
        deleted: false,
    });
}
const deleteOrdersConfirm = ( state, action ) => {
    return updateObject( state, {
        deleting: false,
    });
}

const reducer = ( state = intialState , action ) => {
    switch( action.type ) {
        case ( actionTypes.PURCHASE_BURGER_INIT ) : 
            return purchaseBurgerInit( state, action );
        case ( actionTypes.PURCHASE_BURGER_START ) :
            return purchaseBurgerStart( state, action );
        case ( actionTypes.PURCHASE_BURGER_SUCCESS ) :
            return purchaseBurgerSuccess( state, action );
        case ( actionTypes.PURCHASE_BURGER_FAILED ) :
            return purchaseBurgerFailed( state , action );
        case ( actionTypes.FETCH_ORDERS_START ) :
            return fetchOrdersStart( state, action);
        case ( actionTypes.FETCH_ORDERS_SUCCESS ) :
            return fetchOrdersSuccess( state, action );
        case ( actionTypes.FETCH_ORDERS_FAILED ) :
            return fetchOrdersFailed( state, action );
        case ( actionTypes.DELETE_ORDERS_START ) : 
            return deleteOrdersStart( state, action );
        case ( actionTypes.DELETE_ORDERS_SUCCESS ) : 
            return deleteOrdersSuccess( state, action );
        case ( actionTypes.DELETE_ORDERS_FAILED ) : 
            return deleteOrdersFailed( state, action );
        case ( actionTypes.DELETE_ORDERS_CONFIRM ) : 
            return deleteOrdersConfirm( state, action );
        default : 
            return state
    }
};
export default reducer;

