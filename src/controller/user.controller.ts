import moment from "moment";
import BadRequestError from "../errors/BadRequestError";
import { CustomRequest } from "../interface/CustomRequest";
import UserModel, { SUBSCRUPTION_TYPE, User } from "../models/user.model"
import { apiResponse } from "../utils/apiResponse";
import { Response } from "express";
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { log } from "console";
const bcrypt = require('bcrypt');

const STRIPE_SECRET_KEY = '';
const website = 'https://goldpriceupdate.com'


const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});


export const getUserInformation = async (req: CustomRequest, res: Response) => {


    const user: User = {
        ...req.user.toObject(),
        password: null
    }

    const todayDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const exparationDate = moment(user.exparationDate).format('YYYY-MM-DD HH:mm:ss')
    let keyExpirer = todayDate > exparationDate ? true : false;

    apiResponse({
        res,
        message: "Successfully get",
        data: {
            user: { ...user, keyExpirer },
        },
    });
}



export const updateUserInformation = async (req: CustomRequest, res: Response) => {
    const user = req.user
    const { password } = req.body;

    if (!password) {
        throw new BadRequestError({ message: 'password empty' })
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.updateOne({
        email: user.email
    }, {
        $set: {
            password: hashedPassword
        }
    })

}








export const updateAuth = async (req: CustomRequest, res: Response) => {
    const { type, value } = req.body;
    const user = req.user
    if (!type) {
        return res.status(400).json({ message: "type is required" })
    }

    if (!value) {
        return res.status(400).json({ message: "value is required" })
    }

    await UserModel.updateOne({
        email: user.email
    }, {
        $set: {
            [type]: value,
        }
    })


    const user_ = await UserModel.findOne({ email: user.email })


    apiResponse({
        res,
        message: "Successfully get",
        data: {
            user: user_?.toObject()
        },
    });

}


export const subscribePackage = async (req: CustomRequest, res: Response) => {
    const user: User = req.user.toObject()
    let product_price_id = "price_1MXTlZJjBlXLorLFKpdmYKsR";


    let customer = null;


    if (!user.stripeId) {
        customer = await stripe.customers.create({
            email: user.email,
            description: `New Gold API Customer ${user.email}`,
            name: user.name,
            metadata: {
                "userId": user._id,
                "email": user.email
            }
        });
        // update user
        const result = await UserModel.updateOne({ email: user.email }, { $set: { stripeId: customer.id } });
    } else {
        customer = await stripe.customers.retrieve(user.stripeId);
    }


    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
            {
                price: product_price_id,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${website}/success?userId=${user._id}`,
        cancel_url: `${website}/canceled?userId=${user._id}`,
    });


    apiResponse({
        res,
        message: "Successfully get",
        data: {
            session,
        },
    });
}

export const customerPortalLink = async (req: CustomRequest, res: Response) => {

    const user: User = req.user.toObject()

    if (!user.stripeId) {
        const customer = await stripe.customers.create({
            email: user.email,
            description: `New Gold API Customer ${user.email}`,
            name: user.name,
            metadata: {
                "userId": user._id,
                "email": user.email
            }
        });
        await UserModel.updateOne({ email: user.email }, { $set: { stripeId: customer.id } });

        const session = await stripe.billingPortal.sessions.create({
            customer: customer.id,
            return_url: website,

        });

        return apiResponse({
            res,
            message: "Successfully get",
            data: {
                session,
            },
        });
    }


    const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeId,
        return_url: website,

    });

    return apiResponse({
        res,
        message: "Successfully get",
        data: {
            session,
        },
    });



}

export const updateSubscription = async (req: CustomRequest, res: Response) => {
    const user: User = req.user.toObject()
    await UserModel.updateOne({ email: user.email }, {
        $set: {
            subscriptionType: SUBSCRUPTION_TYPE.MONTHLY,
            subscribetionDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            exparationDate: moment().add(1, "month").format("YYYY-MM-DD HH:mm:ss"),
        }
    });
}



export const checkSecureKey = async (req: CustomRequest, res: Response) => {

    const { key, appPackage, domain } = req.query;

    if (!key) {
        throw new BadRequestError({
            code: 400,
            message: "key is required",
        });
    }

    const user = await UserModel.findOne({
        apiSecretKey: key
    })




    if (!user) {
        throw new BadRequestError({
            code: 400,
            message: "invalid key contact to support",
        });
    }


    const todayDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const exparationDate = moment(user.exparationDate).format('YYYY-MM-DD HH:mm:ss')


    if (todayDate > exparationDate) {
        throw new BadRequestError({
            code: 400,
            message: "expired key",
        });
    }


    if (appPackage && appPackage !== 'undefined') {
        if (user.appPackage !== appPackage) {
            throw new BadRequestError({
                code: 400,
                message: "invalid package name",
            });
        }
    }

    if (domain && domain !== 'undefined') {
        if (user.domain !== domain) {
            throw new BadRequestError({
                code: 400,
                message: "invalid domain name",
            });
        }
    }


    // if(!domain && !appPackage){
    //     throw new BadRequestError({
    //         code: 400,
    //         message: "invalid platform",
    //     });
    // }

    return apiResponse({
        res,
        message: "Valid key",
    });

}

export const randomTokenRegeneate = async (req: CustomRequest, res: Response) => {
    const domain = req.query.domain
    const appPackage = req.query.appPackage || ""
    const type = req.query.type || ""
    const token = jwt.sign({
        domain: domain,
        appPackage: appPackage,
        type: type
    }, 'package-validation-key', { expiresIn: 60000 })
    res.send(token)
}

export const userSocketTokenRegeneate = async (req: CustomRequest, res: Response) => {
    const domain = req.body.domain
    const appPackage = req.body.appPackage || ""
    const type = req.body.type || ""
    const from = req.body.from || ""

    console.log(req.body);


    if (type === "app" && from === "flutter-package") {
        log({ type, from });
        const token = jwt.sign({
            domain: domain,
            appPackage: appPackage,
            type: type,
            from: from
        }, 'package-validation-key', { expiresIn: 60000 })
        return res.send(token)
    } else if(type === "web" && from === "react-package"){
        console.log({ type, from });
        
        const token = jwt.sign({
            domain: domain,
            appPackage: appPackage,
            type: type,
            from: from
        }, 'package-validation-key', { expiresIn: 60000 })
        log(token);
        return res.send(token)
    }else{
        return res.send('error')
    }

    // const token = jwt.sign({
    //     domain: domain,
    //     appPackage: appPackage,
    //     type: type
    // }, 'package-validation-key', { expiresIn: 60000 })
    // res.send('error')
}