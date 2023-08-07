import { UserDto } from "../users/dto"

export type RegistrationDto = {
    id: number,
    fio: string,
    phone: string,
    doctor: string,
    dateRegistration: string, // Date
    registered: boolean,
    comments: string,
    owner: UserDto
}

export type UpdateRegistrationDto = {
    isRegistered: boolean
}