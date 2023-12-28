import { body } from 'express-validator';
import BadRequestError from '../errors/BadRequestError';

// const validateServiceType = (value: SERVICES_TYPE) => {
//     if (!Object.values(SERVICES_TYPE).includes(value)) {
//       throw new BadRequestError({message: 'Invalid service type'});
//     }
//     return true;
//   };

export const serviceValidation = [
    body("price").notEmpty().withMessage('Price is required').isNumeric().withMessage('Enter price in number format'),
    body("names").notEmpty().withMessage('names array is required').isArray().withMessage('names must be an array'),
    body('category').notEmpty().withMessage('Type is required').isString().withMessage('Select type')
]