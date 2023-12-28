import moment from "moment";
import BadRequestError from "../errors/BadRequestError";
import { CustomRequest } from "../interface/CustomRequest";
import UserModel from "../models/user.model";
import axios from 'axios'
import { apiResponse } from "../utils/apiResponse";
import { Response } from "express";


export const pairController = async (req: CustomRequest, res: Response) => {

    try {
        const symbol = req.params.symbol;
        const secretKey = req.get('secret-key');
        const appPackage = req.get('appPackage');
        const domain = req.get('domain')


        const user = await UserModel.findOne({
            apiSecretKey: secretKey
        })

        if (!user) {
            throw new BadRequestError({
                message: "invalid key"
            })
        }


        const todayDate = moment().format('YYYY-MM-DD HH:mm:ss')
        const exparationDate = moment(user.exparationDate).format('YYYY-MM-DD HH:mm:ss')


        if (todayDate > exparationDate) {
            throw new BadRequestError({
                code: 400,
                message: "expired key",
            });
        }


        

        const windows_server_id = '34.29.31.58'
        const response = await axios.get("http://" + windows_server_id + `:3000/pair/${symbol}.sd`)

        if (response?.data?.status) {
            return apiResponse({
                res,
                message: "success",
                data: response.data
            });
        } else {
            throw new BadRequestError({
                code: 500,
                message: 'something wrong in sw-server please contact support admin@goldpriceupdate.com',
            });
            
        }


    } catch (error : any) {
        throw new BadRequestError({
            code: 500,
            message: error.message,
        });
    }

}

const getCurrencyRate = async (symbol: string) => {
    const windows_server_id = '34.29.31.58'
    const response = await axios.get("http://" + windows_server_id + `:3000/pair/${symbol}.sd`)
    if (response?.data?.status) {
        return response.data.ask
    }else{
        console.log('something wrong in sw-server please contact support')
        return 0
    }
}



export const convertedRateController = async (req: CustomRequest, res: Response) => {
    try {
        
        
        const secretKey = req.get('secret-key');
       
        const user = await UserModel.findOne({
            apiSecretKey: secretKey
        })

        if (!user) {
            throw new BadRequestError({
                message: "invalid key"
            })
        }


        const todayDate = moment().format('YYYY-MM-DD HH:mm:ss')
        const exparationDate = moment(user.exparationDate).format('YYYY-MM-DD HH:mm:ss')


        if (todayDate > exparationDate) {
            throw new BadRequestError({
                code: 400,
                message: "expired key",
            });
        }


        const rates = {
            EURUSD: 0,
            EURCAD: 0,
            EURGBP: 0,
            EURAED: 0,
        }
        
        rates.EURUSD = await getCurrencyRate('EURUSD');
        rates.EURCAD = await getCurrencyRate('EURCAD');
        rates.EURGBP = await getCurrencyRate('EURGBP');

        const USDAED_RATE = 3.6725;

        const amountInAED = (1 * (rates?.EURUSD)) * USDAED_RATE;
        rates.EURAED = amountInAED;

        apiResponse({
            res,
            message: "success",
            data: rates
        });


    } catch (error : any) {
        throw new BadRequestError({
            code: 500,
            message: error.message,
        });
    }
}