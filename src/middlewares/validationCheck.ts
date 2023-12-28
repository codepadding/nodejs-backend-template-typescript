import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import BadRequestError from "../errors/BadRequestError";

export const validationCheck = (req : Request,res : Response ,  next: NextFunction ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new BadRequestError({
            errors: result.array(),
        });
    }
    next()
}