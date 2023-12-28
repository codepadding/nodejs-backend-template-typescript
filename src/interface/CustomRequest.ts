import { Request } from 'express';

export interface CustomRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
    userId?:string
}
