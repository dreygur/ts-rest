import { Request } from "express";

export interface JoiSchema {
    body?: Object;
    params?: Object;
    query?: Object;
}

export interface IUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    accountVerified: boolean;
    mfaDetails: string;
    mfaEnabled: boolean;
    phoneNumber: string;
    role: string;
    status: string;
    profilePhotoURL: string;
}

export interface AsyncRequest extends Request {
    user: IUser;
    options: any;
}

export interface IRequestOptions {
    id?: number;
}