import mongoose, {
    InferSchemaType,
    ObjectId,
    Schema,
  } from "mongoose";
  const { ObjectId } = Schema.Types;
  
  export enum DOCUMENT_FILE_TYPE {
    png = "png",
    jpg = "jpg",
    jpge = "jpge",
    jpeg = "jpeg",
    svg = "svg",
    gif = "gif",
    pdf = "pdf",
    doc = "doc",
    docx = "docx",
    xls = "xls",
    xlsx = "xlsx",
    ppt = "ppt",
    pptx = "pptx",
    txt = "txt",
    csv = "csv",
    mp4 = "mp4",
    mp3 = "mp3",
    wav = "wav",
    mov = "mov",
    avi = "avi",
    zip = "zip",
    rar = "rar",
    tar = "tar",
    other = "other",
  }


  export const DOCUMENT_MODEL_NAME = "document";

  
  export enum DOCUMENT_TYPE {
    PASSPORT = "PASSPORT",
    IDENTITY = "IDENTITY",
    PROFILE_PICTURE = "PROFILE_PICTURE",
    VERIFIED_PICTURE = "VERIFIED_PICTURE",
    PRODUCT_IMAGE = "PRODUCT_IMAGE",
    PRODUCT_VIDEO = "PRODUCT_VIDEO",
    PRODUCT_AUDIO = "PRODUCT_AUDIO",
    PRODUCT_DOCUMENT = "PRODUCT_DOCUMENT",
    OTHER = "OTHER",
  }
  
  const schema: Schema = new Schema(
    {
      name: { type: String },
      path: { type: String, required: true },
      size: { type: Number },
      fileType: { type: String, enum: DOCUMENT_FILE_TYPE, required: true },
      documentType: {
        type: String,
        enum: DOCUMENT_TYPE,
        default: DOCUMENT_TYPE.OTHER,
      },
      user: { type: ObjectId },
    },
    {
      timestamps: true,
      collection: DOCUMENT_MODEL_NAME,
      versionKey: false,
    }
  );
  
  export interface Document extends InferSchemaType<typeof schema> {
    [x: string]: any;
  }
  
  const DocumentModel = mongoose.model(DOCUMENT_MODEL_NAME, schema);
  
  export default DocumentModel;