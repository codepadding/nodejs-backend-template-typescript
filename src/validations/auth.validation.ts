import { body } from 'express-validator';

const logInValidation = [
    body("email").notEmpty().withMessage('Email is required'),
    body("email").isEmail().withMessage('Enter valid email'),
    body("password").notEmpty().withMessage('Password is required'),
    body("password").isLength({min: 5}).withMessage('Password should be minimum length of 5 chars'),
]

const signUpValidation = [
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email'),
    body("password").notEmpty().withMessage('Password is required').isLength({min: 5}).withMessage('Password should be minimum length of 5 chars'),
    body("firstName").notEmpty().withMessage('firstName is required'),
    body("lastName").notEmpty().withMessage('lastName is required'),
    body("confirmPassword").notEmpty().withMessage('confirmPassword is required'),
]

const otpValidation = [
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email'),
]
const signupAddValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('number').notEmpty().withMessage('Number is required'),
];


const googleSignUpValidation = [
    // body('firstName').notEmpty().withMessage('firstName is required'),
    // body('lastName').notEmpty().withMessage('lastName is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('picture').notEmpty().withMessage('picture is required'),
]


export default signupAddValidation;
export {
    googleSignUpValidation,
    signUpValidation,
    logInValidation,
    otpValidation
}
