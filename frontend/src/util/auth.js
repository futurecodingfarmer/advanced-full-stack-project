import { redirect } from "react-router-dom";

export function getAuthToken(){
    const token = localStorage.getItem('token');
    const tokenDuration = getTokenDuration();

    if(!token){
        return null;
    }
    
    if(tokenDuration < 0){
        return 'EXPIRED';
    }

    return token;
};

export function getTokenDuration(){
    const storedExpiration = localStorage.getItem('expariation');
    const expariation = new Date(storedExpiration);
    const now = new Date();
    const duration = expariation.getTime() - now.getTime();

    return duration;
    
}

export function tokenLoader(){
    return getAuthToken();
};

export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token){
        return redirect('/auth');
    }
        
    return null;
};