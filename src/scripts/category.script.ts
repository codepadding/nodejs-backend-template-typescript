
import mongoose, { Mongoose } from "mongoose"
import dotenv from 'dotenv';
import moment from "moment";
import CategoryModel, { CATEGORY_STATUS } from "../models/category.model";
dotenv.config();



const CategoryCreate = async ({name,description,image,icon,parentId}: any) => {
   
    const category = await CategoryModel.create({
        name: name,
        description: description,
        image: image,
        icon: icon,
        status: CATEGORY_STATUS.ACTIVE,
        parent: parentId,
        children: [],
        deletedAt: null,
    })


    if(parentId){
        await CategoryModel.updateOne({ _id: parentId }, { $push: { children: category._id } })
    }

    return category
    
}



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


        // delete all data
        await CategoryModel.deleteMany({})


        const Python = await CategoryCreate({
            name: "Python",
            description: "Python is a high-level, general-purpose, interpreted, programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected",
            image: "https://developers.redhat.com/sites/default/files/styles/article_feature/public/Python-01%20%282%29.png?itok=TEVIQBQo",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: null,
        })


        const Django = await CategoryCreate({
            name: "Django",
            description: "Django is a Python-based free and open-source web framework that follows the model-template-views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.",
            image: "https://miro.medium.com/max/1200/1*0G5zu7CnXdMT9pGbYUTQLQ.png",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: Python._id,
        })


        const Flask = await CategoryCreate({
            name: "Flask",
            description: "Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries.",
            image: "https://miro.medium.com/max/1200/1*0G5zu7CnXdMT9pGbYUTQLQ.png",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: Python._id,
        })








       
        const nodejs = await CategoryCreate({
            name: "Nodejs",
            description: "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
            image: "https://www.fullstackpython.com/img/logos/nodejs.jpg",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: null,
        })


        const express = await CategoryCreate({
            name: "Express",
            description: "Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.",
            image: "https://miro.medium.com/max/1200/1*Jr3NFSKTfQWRUyjblBSKeg.png",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: nodejs._id,
        })


        const nestjs = await CategoryCreate({
            name: "Nestjs",
            description: "NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Progamming), FP (Functional Programming), and FRP (Functional Reactive Programming).",
            image: "https://miro.medium.com/max/1200/1*Jr3NFSKTfQWRUyjblBSKeg.png",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: nodejs._id,
        })



        // inside of express js 


        const mongodb = await CategoryCreate({
            name: "MongoDB",
            description: "MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.",
            image: "https://www.fullstackpython.com/img/logos/mongodb.png",
            icon: "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId: express._id,
        })


        // inside of mongodb add mongoose

        const mongoose_ = await CategoryCreate({
            name : "Mongoose",
            description : "Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.",
            image : "https://miro.medium.com/max/1200/1*Jr3NFSKTfQWRUyjblBSKeg.png",
            icon : "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId : mongodb._id,
        })


        // inside of mongodb add mongoose

        await CategoryCreate({
            name : "Typegoose",
            description : "Typegoose is a wrapper for mongoose which helps to reduce the boilerplate code for typegoose models.",
            image : "https://miro.medium.com/max/1200/1*Jr3NFSKTfQWRUyjblBSKeg.png",
            icon : "https://softbuilders.com/images/icons/technology-icon-7.svg",
            parentId : mongoose_._id,
        })


        


       


        console.log("update category success");
        


    } catch (error) {
        console.log(error);
    }
})()