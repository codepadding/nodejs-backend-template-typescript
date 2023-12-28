import express, { Request, Response } from 'express';
import { googleAuthSignUp } from '../../controller/auth.controller';
import { googleSignUpValidation } from '../../validations/auth.validation';
import { validationCheck } from '../../middlewares/validationCheck';
const router = express.Router();

router.get('/', (req: Request, res: Response) => res.send('res'))
router.post("/google/signup", googleSignUpValidation, validationCheck, googleAuthSignUp);
router.post("/login", googleSignUpValidation, validationCheck, googleAuthSignUp);

export default router;