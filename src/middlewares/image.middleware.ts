import { Request, Response, NextFunction } from "express";
import multer, {  Multer } from "multer";
import { apiResponse } from "../utils/apiResponse";
import BadRequestError from "../errors/BadRequestError";

const storage = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });

export type UploadedFiles = {
    [fieldname: string]: {
        fieldname: string;
        originalname: string;
        size: number;
        buffer: any;
        // Other properties if available
    }[];
};


interface CustomFileField {
    name: string;
    maxCount?: number | undefined;
    required: boolean;
}

export const handleFileUpload = (fields: CustomFileField[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        upload.fields(fields)(req, res, (err: any) => {
            if (err) {
                return apiResponse({
                    res,
                    code: 500,
                    message: "Internal server error",
                    errors: err.message,
                });
            }

            const files: any = req.files;
            const errors: any[] = [];

            fields.forEach((field) => {
                if (field.required && !files[field.name]) {
                    errors.push(field.name);
                }
            });

            if (errors.length > 0) {
                return apiResponse({
                    res,
                    code: 400,
                    message: "Files not found in request body",
                    errors: errors,
                });
            }

            next();
        });
    };
};

export const mapFileUploads = (uploadedFiles: UploadedFiles) => {
    const mappedFiles = Object.keys(uploadedFiles).reduce((result, key) => {
        result[key] = uploadedFiles[key].map((file) => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            size: file.size,
            buffer: file.buffer,
        }));
        return result;
    }, {} as Record<string, any>);

    return mappedFiles;
};
