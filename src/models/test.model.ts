import mongoose, {
    Schema,
    InferSchemaType,

} from "mongoose";


const TEST_MODEL_NAME = "testmodel";

const schema = new Schema(
    {
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
        collection:TEST_MODEL_NAME,
        versionKey: false,
    }
);


interface Category extends InferSchemaType<typeof schema> {
    [x: string]: any;
}


export default mongoose.model(TEST_MODEL_NAME, schema);
export { Category, }