import { UserDto } from "../users/dto"

export type RegistrationDto = {
    id: number,
    fio: string,
    phone: string,
    doctor: string,
    dateRegistration: Date,
    registered: boolean,
    comments: string,
    date: Date,
    owner: UserDto
}

export type UpdateRegistrationDto = {
    isRegistered: boolean
}