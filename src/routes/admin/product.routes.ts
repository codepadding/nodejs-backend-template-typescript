import express, { Request, Response } from 'express';
import { validationCheck } from '../../middlewares/validationCheck';
import { uploadProduct } from '../../controller/product.controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => res.send('res'))
router.post('/create',uploadProduct)

export default router;