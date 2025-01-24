import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const isTokenExpired = (token) => {
    if(!token) return true;
    const decodedStr = jwtDecode(token);
    return decodedStr.exp * 1000 < Date.now();
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function refreshToken(){
    const refreshToken = Cookies.get('refreshToken');
    if(refreshToken){
        try{
            const resp = await fetch(`h${BASE_URL}/refresh_token`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${refreshToken}`
                }
            });
            if(resp.status === 401){
                return null;
            }else{
                const data = await resp.json();
                return data.newAccessToken;
            }
        }catch(err){
            console.log(err);
        }
    }else{
        return null;
    }
}

export const verifyToken = async( accessToken ) => {
    try{
        const resp = await fetch(`${BASE_URL}/verify_token`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        if(resp.status === 401){
            const newAccessToken = await refreshToken();
            if(newAccessToken){
                return newAccessToken;
            }else{
                return null;
            }
        }
        return accessToken;
    }catch(err){
        console.log(err);
    }
}

export async function userAuth( accessToken ) {
    if(isTokenExpired(accessToken)){
        const newAccessToken = await refreshToken();
        if(newAccessToken){
            return newAccessToken
        }
        return null;
    }else{
        const verifiedToken = await verifyToken(accessToken);
        return verifiedToken;
    }
}