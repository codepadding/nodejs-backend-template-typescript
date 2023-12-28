import { Response } from "express";
import { CustomRequest } from "../interface/CustomRequest";


export const getProduct = async (req: CustomRequest, res: Response) => {

    return res.send('product')

}; 