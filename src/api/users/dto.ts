export type UserDto = {
    id: number,
    username: string,
    accountLocked: boolean
}

export type CreateUserDto = {
    username: string,
    password: string
}