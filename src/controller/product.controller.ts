import { Response } from "express";
import { CustomRequest } from "../interface/CustomRequest";
import { apiResponse } from "../utils/apiResponse";


export const getProduct = async (req: CustomRequest, res: Response) => {

    return res.send('product')

}; 



export const uploadProduct = async (req: CustomRequest, res: Response) => {




    return apiResponse({
        res,
        message : 'success'
    })
}; 
