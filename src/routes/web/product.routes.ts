import express, { Response, Router } from 'express';
import { getProduct } from '../../controller/product.controller';
const router: Router = express.Router();



router.get('/',getProduct)


export default router;
