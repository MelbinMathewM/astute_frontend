import React, { createContext, ReactNode, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../auth/userAuth";
import { setUserToken, updateUser } from "../redux/store";
import Cookies from "js-cookie";

const UserContext = createContext(null);

const UserProvider = ({children}) => {

    const accessToken = useSelector((state) => state.userToken);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState(accessToken ? true : false);

    useLayoutEffect(() => {
        const checkUserAuth = async() => {
            const newAccessToken = await userAuth(accessToken);
            if(newAccessToken){
                dispatch(setUserToken(newAccessToken));
                Cookies.set('accessToken',newAccessToken);

                try{
                    const res = await fetch(`${BASE_URL}/home`,{
                        method : 'GET',
                        headers : {
                            'Content-Type' : 'application/json',
                            'Authorization' : `Bearer ${newAccessToken}`
                        }
                    });
                    if(res.status === 401){
                        checkUserAuth()
                    }else{
                        const data = await res.json();
                        dispatch(updateUser(data.user));
                    }
                }catch(err){
                    console.error('error fetching user home',err)
                }
            }else{
                logout();
            }
        }
        checkUserAuth()
    },[isAuth, accessToken, dispatch, userAuth])

    const logout = () => {
        dispatch(setUserToken(null));
        dispatch(updateUser(null));
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsAuth(false);
    }

    return (
        <UserContext.Provider value={{ isAuth, setIsAuth, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserProvider
}