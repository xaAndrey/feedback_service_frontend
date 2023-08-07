import { useState, useCallback, useEffect } from "react";
import {Cookies} from "react-cookie";

export const cookies = new Cookies();

export const useAuth = () => {
    const [token, setToken] = useState<string | null>('1');
    const cookieName = 'accessToken';

    const login = useCallback((jwtToken: string) => {
        setToken(jwtToken);
        cookies.set(cookieName, jwtToken);
    }, [token]);

    const logout = useCallback(() => {
        setToken(null);
        cookies.remove(cookieName);
    }, []);

    useEffect(() => {
        const tokenCookie = cookies.get(cookieName);
        if (!!tokenCookie) {
            login(tokenCookie);
        }
    }, [login]);

    return {login, logout, token};
}