import express, { Response, Router } from 'express';
import { getProduct, uploadProduct } from '../../controller/product.controller';
import { productValidation } from '../../validations/productValidation';
import { validationCheck } from '../../middlewares/validationCheck';
import { body } from 'express-validator';
import multer from 'multer';
const router: Router = express.Router();
// Configure multer for handling form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/', upload.single('file') , productValidation,validationCheck,uploadProduct)


export default router;
