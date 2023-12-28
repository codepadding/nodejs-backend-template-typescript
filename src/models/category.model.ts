import mongoose, {
    Schema,
    InferSchemaType,

} from "mongoose";
const { ObjectId } = Schema.Types;

const CATEGORY_MODEL_NAME = "category";

enum CATEGORY_STATUS {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}


const schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        image: { type: String },
        icon: { type: String },
        status: { type: String, enum: CATEGORY_STATUS, default: CATEGORY_STATUS.ACTIVE },
        parent: { type: ObjectId , ref: CATEGORY_MODEL_NAME },
        children: [{ type: ObjectId, ref: CATEGORY_MODEL_NAME }],
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
        collection:CATEGORY_MODEL_NAME,
        versionKey: false,
    }
);


interface Category extends InferSchemaType<typeof schema> {
    [x: string]: any;
}


export default mongoose.model(CATEGORY_MODEL_NAME, schema);
export { Category,CATEGORY_STATUS,CATEGORY_MODEL_NAME }