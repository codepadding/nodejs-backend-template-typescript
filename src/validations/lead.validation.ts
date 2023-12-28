import { body, ValidationChain } from 'express-validator';

export const leadValidation: ValidationChain[] = [
    body("firstName").notEmpty().withMessage('firstName is required').isString().withMessage('Enter firstName.'),
    body("lastName").notEmpty().withMessage('lastName is required').isString().withMessage('Enter lastName.'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email'),
    body("phoneNumber").notEmpty().withMessage('phoneNumber is required').isNumeric().withMessage('Enter valid phone number'),
    body("countryCode").notEmpty().withMessage('countryCode is required').isNumeric().withMessage('Enter valid country code'),
    body('language').notEmpty().withMessage('Language is Required')
]

export const packageValidation: ValidationChain[] = [
    body('names').notEmpty().withMessage('Name is required').isArray().withMessage('names must be an array'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price should be a number'),
    body('services').isArray().withMessage('Services must be an array'),
];