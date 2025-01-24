import { createStore, combineReducers } from "redux";
import Cookies from 'js-cookie';

const user = ( prevState = null, action ) => {
    switch(action.type){
        case 'update-user':
            return action.payload;
        default:
            return prevState;
    }
}

const initialUserCookie = Cookies.get('accessToken') ? Cookies.get('accessToken') : null;

const userToken = ( prevState = initialUserCookie, action ) => {
    switch(action.type){
        case 'set-user-token':
            return action.payload;
        default:
            return prevState;
    }
}

const admin  = ( prevState = null, action ) => {
    switch(action.type){
        case 'update-admin':
            return action.payload;
        default:
            return prevState
    }
}

const initialAdminCookie = Cookies.get('adminAccessToken') ? Cookies.get('adminAccessToken') : null;

const adminToken = ( prevState = initialAdminCookie, action ) => {
    switch(action.type){
        case 'set-admin-token':
            return action.payload;
        default:
            return prevState;
    }
}

const appReducer = combineReducers({
    user,
    userToken,
    admin,
    adminToken
})

export function setUserToken( token ){
    return {
        type : 'set-user-token',
        payload : token
    }
}

export function updateUser( token ){
    return {
        type : 'update-user',
        payload : token
    }
}

export function setAdminToken( token ){
    return {
        type : 'set-admin-token',
        payload : token
    }
}

export function updateAdmin( token ){
    return {
        type : 'update-admin',
        payload : token
    }
}

const store = createStore(appReducer);
export default store;