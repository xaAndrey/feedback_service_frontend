import { UserDto, CreateUserDto } from "./dto";
import { HttpClient } from "../../ky/HttpClient";

export const fetchAllUsers = async (): Promise<UserDto[]> => {
    return await HttpClient.get('users').then(r => r.json());
}

export const createUser = async (dto: CreateUserDto): Promise<Response> => {
    return HttpClient.post('users/user', {json: dto});
}

export const fetchUserById = async (id: number): Promise<UserDto> => {
    return await HttpClient.get(`users/user/${id}`).then(r => r.json());
}