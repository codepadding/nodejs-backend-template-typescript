
import mongoose, {
    Schema,
    InferSchemaType,

} from "mongoose";
import { CATEGORY_MODEL_NAME } from "./category.model";
const { ObjectId } = Schema.Types;

const PRODUCT_MODEL_NAME = "category";

enum PRODUCT_STATUS {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}


const schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        image: { type: String },
        images : [{ type: String }],
        status: { type: String, enum: PRODUCT_STATUS, default: PRODUCT_STATUS.ACTIVE },
        category: { type: ObjectId , ref: CATEGORY_MODEL_NAME },    
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
        collection:PRODUCT_MODEL_NAME,
        versionKey: false,
    }
);


interface Category extends InferSchemaType<typeof schema> {
    [x: string]: any;
}


export default mongoose.model(PRODUCT_MODEL_NAME, schema);
export { Category,PRODUCT_STATUS,PRODUCT_MODEL_NAME }