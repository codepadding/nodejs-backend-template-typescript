
import mongoose, { Mongoose } from "mongoose"
import dotenv from 'dotenv';
import * as readline from 'readline';
import UserModel, { SUBSCRUPTION_TYPE } from "../models/user.model";
import moment from "moment";

dotenv.config();




(async () => {
    try {

        const db: Mongoose = await mongoose.connect(process.env.MONGODB_URL || '', {
            autoIndex: false,
            dbName: process.env.DB_NAME
        })
        const status = db.connection.readyState
        if (status === db.STATES.connected) {
            console.log('db is connected db name - ' + db.connection.db.databaseName);
            console.log(db.connection.host);
        }


        const users = await UserModel.create(
            [
                {
                    firstName:"Karnaphuli Jewellery",
                    lastName:"Trading LLC",
                    displayName : "Karnaphuli Jewellery",
                    email:"karnaphulijewellery@gmail.com",
                    image: "https://lh3.googleusercontent.com/a/AAcHTteXkABSy_pcGt4rfxHs1bGCpxfgc-lCo_E-Hs0f=s96-c",
                    subscriptionType: SUBSCRUPTION_TYPE.YEARLY,
                    subscribetionDate: moment("2023-06-10 18:50:55").format('YYYY-MM-DD HH:mm:ss'),
                    exparationDate: moment("2024-06-10 17:14:54").format('YYYY-MM-DD HH:mm:ss'),
                    apiSecretKey: 'JUW0FexuguFLpsMNIdveXckJJwSraF61',
                    domain : 'karnaphulijewellery.com',
                    appPackage : 'com.app.karnaphuli'
                },
                {
                    firstName:"Royal Bengal",
                    lastName:"Gold",
                    displayName : "Royal Bengal",
                    email:"taghyeerit.app@gmail.com",
                    image: "https://lh3.googleusercontent.com/a/AEdFTp7PTbx__VnavMmJEHTtrkaNj5azP3OkuDW2-2-I=s96-c",
                    subscriptionType: SUBSCRUPTION_TYPE.YEARLY,
                    subscribetionDate: moment("2023-02-06 18:47:55").format('YYYY-MM-DD HH:mm:ss'),
                    exparationDate: moment("2024-03-17 22:21:27").format('YYYY-MM-DD HH:mm:ss'),
                    apiSecretKey: 'JUW0FexuguFLpsMNIdveXckJJwSraF69',
                    domain : 'mobile.nicejewellers.com',
                    appPackage : 'com.app.royalbengalgold'
                },
            
            ]
        );


        console.log("successfully load old user");
        


    } catch (error) {
        console.log(error);
    }
})()