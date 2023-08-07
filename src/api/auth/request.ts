import { AuthResponse } from './dto';
import ky from 'ky';
import { AUTH_BACKEND_URL } from '../../utils/feedback-service.constants';

export const auth = async (username: string, password: string): Promise<AuthResponse | null> => {
    return ky.post(`${AUTH_BACKEND_URL}access`, {
        json: {
            login: username,
            password: password
        },
        timeout: false,
        throwHttpErrors: false,
    }).then(res => res.ok ? res.json() : Promise.resolve(null));
}

// .then(res => res.ok ? res.json() : Promise.resolve(null))

export const refreshToken = async (refreshToken: string): Promise<AuthResponse | null> => {
    return ky.post(`${AUTH_BACKEND_URL}refresh`, {
        json: {
            refreshToken: refreshToken
        }
    }).then(res => res.ok ? res.json() : Promise.resolve(null))
}