import { Request, Response } from "express";
import CategoryModel, { CATEGORY_MODEL_NAME, CATEGORY_STATUS, Category } from "../models/category.model";
import { apiResponse } from "../utils/apiResponse";
import {
    Schema,
} from "mongoose";
const { ObjectId } = Schema.Types;
// recursive 

export const getAllCategory = async (req: Request, res: Response) => {
    const populateChildrenRecursive = async (category:Category) => {
        if (category.children && category.children.length > 0) {
            await Promise.all(
                category.children.map(async (child) => {
                    const populatedChild = await CategoryModel.populate(child, {
                        path: 'children',
                        model: CATEGORY_MODEL_NAME,
                    });
                    await populateChildrenRecursive(populatedChild);
                })
            );
        }
    };
    
    const categories = await CategoryModel.find({ parent: null }).populate('children');
    await Promise.all(
        categories.map(async (category) => {
            await populateChildrenRecursive(category);
        })
    );
    
    // Now, 'categories' should contain the fully populated hierarchy
    



    apiResponse({
        res,
        data: categories,
    })

};


export const getSingleCategory = async (req: Request, res: Response) => {


    

    // const categories = await CategoryModel.aggregate([
    //     {
    //         $match: {
    //             parent: parent ? 
    //             parent
    //             : null,
    //             status: CATEGORY_STATUS.ACTIVE,
    //         },
    //     },
    //     {
    //         $project: {
    //             name: 1,
    //             description: 1,
    //             image: 1,
    //             icon: 1,
    //             parent: 1,
    //             hasChildren: {
    //                 $cond: {
    //                     if: { $gt: [{ $size: "$children" }, 0] },
    //                     then: true,
    //                     else: false,
    //                 },
    //             },
               
    //         },
    //     },
    // ]);



    const populateChildren = async (category:any) => {
        await category.populate('children');
        if (category.children && category.children.length > 0) {
            for (const child of category.children) {
                await populateChildren(child);
            }
        }
    };
    
    const category = await CategoryModel.findOne({ parent: null , name : 'Nodejs' }).populate('children');
    await populateChildren(category);


    apiResponse({
        res,
        data: category,
    })
}



export const getCategory = async (req: Request, res: Response) => {
    const parent = req.params.id ? req.params.id : null;

    console.log({parent});

    const categorys = await CategoryModel.find({ parent: parent  }).select('name description image icon parent children');


    apiResponse({
        res,
        data: categorys,
    })
}