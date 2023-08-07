import {Cookies} from "react-cookie";
import ky from "ky";
import {
    ACCESS_TOKEN_COOKIE_KEY,
    ACCESS_TOKEN_EXPIRATION_TIME_COOKIE_KEY,
    BACKEND_URL, 
    REFRESH_TOKEN_COOKIE_KEY, 
    REFRESH_TOKEN_EXPIRATION_TIME_COOKIE_KEY
} from "../utils/feedback-service.constants";
import { refreshToken } from "../api/auth/request";

const cookies = new Cookies();

export const HttpClient = ky.extend({
    prefixUrl: BACKEND_URL,
    throwHttpErrors: false,
    hooks: {
        beforeRequest: [
            async (request) => {
                let token = cookies.get(ACCESS_TOKEN_COOKIE_KEY);
                const accessTokenExpirationTime = cookies.get(ACCESS_TOKEN_EXPIRATION_TIME_COOKIE_KEY);
                const savedRefreshToken = cookies.get(REFRESH_TOKEN_COOKIE_KEY);
                const refreshTokenExpirationTime = cookies.get(REFRESH_TOKEN_EXPIRATION_TIME_COOKIE_KEY);
                const nowTime = (new Date()).getTime()
                if (nowTime > accessTokenExpirationTime && refreshTokenExpirationTime > nowTime) {
                    console.log('start refreshing token');
                    const newToken = await refreshToken(savedRefreshToken);
                    console.log('end refreshing token');
                    if (newToken) {
                        token = newToken.accessToken;
                        cookies.set(ACCESS_TOKEN_COOKIE_KEY, newToken.accessToken);
                        cookies.set(ACCESS_TOKEN_EXPIRATION_TIME_COOKIE_KEY, (new Date()).getTime() + newToken.accessTokenExpirationTime - 1000);
                        cookies.set(REFRESH_TOKEN_COOKIE_KEY, newToken.refreshToken);
                        cookies.set(REFRESH_TOKEN_EXPIRATION_TIME_COOKIE_KEY, (new Date()).getTime() + newToken.refreshTokenExpirationTime - 1000);
                    }
                }
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ],
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401) {
                    cookies.remove('token');
                    if (!request.url.includes('login')) {
                        window.location.href = '/login';
                    }
                }
            }
        ]
    }
})