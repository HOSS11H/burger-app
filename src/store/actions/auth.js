import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ( ) => {
    return {
        type: actionTypes.AUTH_START ,
    }
}
export const authSuccess = ( idToken ,  userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS ,
        idToken: idToken,
        userId: userId
    }
}
export const authFailed = ( error ) => {
    return {
        type: actionTypes.AUTH_FAILED ,
        error: error,
    }
}

export const userLogout = (  ) => {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.USER_LOGOUT ,
    }
}
export const userAutoLogout = ( sessionTime ) => {
    return dispatch => {
        setTimeout( ( ) => {
            dispatch( userLogout( ) );
        } , sessionTime * 1000 )
    }
}

export const auth = ( email, password, type ) => {
    return dispatch => {
        dispatch( authStart( ) );
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfO_1n9ixqumGsijFJNlsI4PZX8O9GqBg'
        if (!type) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfO_1n9ixqumGsijFJNlsI4PZX8O9GqBg';
        }
        let reqBody = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        axios.post( url , reqBody )
            .then( response => {
                const token = response.data.idToken;
                const localId = response.data.localId;
                const expirationDate = new Date( new Date( ).getTime( ) + response.data.expiresIn * 1000 ) ;
                dispatch( authSuccess ( token, localId ));
                dispatch( userAutoLogout( response.data.expiresIn ) );
                localStorage.setItem('token', token);
                localStorage.setItem('localId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate );
                console.log(response.data);
            })
            .catch( error => {
                dispatch( authFailed( error.response.data.error.message ));
                console.log( error.response.data.error.message );
            })
    }
}

export const authRedirect = ( path ) => {
    return {
        type: actionTypes.AUTH_REDIRECT ,
        path: path,
    }
}

export const checkAuth = ( ) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if ( !token ) {
            dispatch( userLogout( ) );
        } else {
            const expirationDate =new Date( localStorage.getItem('expirationDate') );
            console.log( expirationDate );
            if ( expirationDate <= new Date( ) ) {
                dispatch( userLogout( ) )
            } else {
                const localId = localStorage.getItem('localId');
                dispatch( authSuccess( token, localId  ) );
                dispatch( userAutoLogout( (expirationDate.getTime( ) - new Date( ).getTime( )) / 1000  ) )
                // console.log( (expirationDate.getTime( ) - new Date( ).getTime( )) / 1000 );
            }
        }
    }
}