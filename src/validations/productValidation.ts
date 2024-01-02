import { body} from 'express-validator';

export const productValidation = [
    // Your validation rules using express-validator
    body('title').notEmpty().withMessage('title is required'),
    // Add more validation rules as needed
  ]
