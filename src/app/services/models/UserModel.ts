export interface IUser {
    userId: string;
    username: string;
    password: string
}

export interface IUserRequest {
    userId: string;
    username: string;
    password: string;
}

export interface IUserResponse {
    token: string;
    user: IUser
}

export interface IDisplaySetting {
    userId: string;
    columnName: string;
    displayFlag: boolean
}

export interface JwtPayload {
    sub: string;
    userId?: string;
    username?: string;
}