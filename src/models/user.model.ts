import mongoose, {
  Schema,
  InferSchemaType,
} from "mongoose";
import { DOCUMENT_MODEL_NAME } from "./document.model";
const {ObjectId} = Schema.Types;

enum USER_STATUS {
  ACTIVE = "ACTIVE",
  TEMP_BLOCK = "TEMP_BLOCK",
  BLOCK = "BLOCK",
};

enum USER_TYPE {
  USER = "USER",
  ADMIN = "ADMIN",
};



export const USER_MODEL_NAME = "user";

const schema = new Schema(
  {
    firstName: { type: String,},
    lastName: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    profile: { type: ObjectId , ref: DOCUMENT_MODEL_NAME },
    type: { type: String, enum: USER_TYPE, default: USER_TYPE.USER },
    verificationFiles: [{ type: ObjectId, ref: DOCUMENT_MODEL_NAME }],
    profileVerified: { type: Boolean, default: false },
    status: { type: String, enum: USER_STATUS, default: USER_STATUS.ACTIVE },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: USER_MODEL_NAME,
    versionKey: false,
  }
);


interface User extends InferSchemaType<typeof schema> {
  [x: string]: any;
}


const UserModel = mongoose.model(USER_MODEL_NAME, schema);

export default UserModel
export { User, USER_STATUS, USER_TYPE }