import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    isAuth: false,
    authRedirectLink: '/',
};

const authStart= ( state, action) => {
    return updateObject( state, {
        loading: true,
        error: null,
    })
}
const authSuccess= ( state, action) => {
    return updateObject( state, {
        loading: false,
        idToken: action.idToken,
        userId: action.userId,
        isAuth: true,
    })
}
const authFailed= ( state, action) => {
    return updateObject( state, {
        loading: false,
        error: action.error
    })
}

const userLogout= ( state, action) => {
    return updateObject( state, {
        idToken: null,
        userId: null,
        isAuth: false,
    })
}

const authRedirect= ( state, action) => {
    return updateObject( state, {
        authRedirectLink: action.path
    })
}

const reducer = ( state = intialState , action ) => {
    switch( action.type ) {
        case( actionTypes.AUTH_START ): return authStart( state, action );
        case( actionTypes.AUTH_SUCCESS ): return authSuccess( state, action );
        case( actionTypes.AUTH_FAILED ): return authFailed( state, action );
        case( actionTypes.USER_LOGOUT ): return userLogout( state, action );
        case( actionTypes.AUTH_REDIRECT ): return authRedirect( state, action );
        default : 
        return state
    }
};
export default reducer;

