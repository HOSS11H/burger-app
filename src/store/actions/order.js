import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


const purchaseBurgerStart = (  ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}
const purchaseBurgerSuccess = ( orderData , orderId ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        order: orderData,
        orderId : orderId
    }
}
export const purchaseBurgerFailed = ( ) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAILED,
    }
}
export const purchaseBurger = ( order , token ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart( ) );
        console.log('waiting')
        axios.post('/orders.json?auth=' + token , order)
            .then(response => {
                dispatch(purchaseBurgerSuccess( order, response.data.name ))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed( error ))
                console.log(error);
            }); 
    }
}
// To Make Sure That We Are Redirected Whenever Purchase is done and Reset It once We Purchase Again
export const purchaseBurgerInit = ( ) => {
    return{
        type: actionTypes.PURCHASE_BURGER_INIT,
    }
}

export const fetchOrdersStart = ( ) => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}
export const fetchOrdersFailed = ( err ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
    }
}
export const fetchOrders = ( token ) => {
    return dispatch => {
        dispatch( fetchOrdersStart() );
        axios.get('/orders.json?auth=' + token)
        .then(response =>{
                let fetchedOrders = [ ] ;
                    for (let key in response.data) {
                        fetchedOrders.push( {
                            ...response.data[key],
                            id: key
                        } )
                    }
                    dispatch( fetchOrdersSuccess( fetchedOrders ) )
            })
            // You Have To Set the Catch method to handle errors because if you don't add it
            // the .Then method Still Excutes anyway.
            .catch(error => {
                dispatch( fetchOrdersFailed( error ) );
            });
    }
}

export const deleteOrdersStart = ( ) => {
    return {
        type: actionTypes.DELETE_ORDERS_START,
    }
}
export const deleteOrdersSuccess = ( id  ) => {
    return {
        type: actionTypes.DELETE_ORDERS_SUCCESS,
        orderId: id,
    }
}
export const deleteOrdersFailed = ( ) => {
    return {
        type: actionTypes.DELETE_ORDERS_FAILED,
    }
}
export const deleteOrdersConfirm = ( ) => {
    return {
        type: actionTypes.DELETE_ORDERS_CONFIRM,
    }
}

export const deleteOrders = ( id , token ) => {
    return dispatch => {
        dispatch( deleteOrdersStart( ) );
        axios.delete(`/orders/${id}.json?auth=` + token )
            .then( res =>  {
                dispatch( deleteOrdersSuccess( id ) )
                console.log(res);
            } )
            .catch( error => {
                dispatch( deleteOrdersFailed( ) )
            })
    }
}

