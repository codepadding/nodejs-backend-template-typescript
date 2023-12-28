import express, { Response, Router } from 'express';
import { apiResponse } from '../../utils/apiResponse';
import { CustomRequest } from '../../interface/CustomRequest';
import category from './category.routes'
import product from './product.routes'
const router: Router = express.Router();


router.get('/', (req: CustomRequest, res: Response) => {
    return apiResponse({
        res,
        message: "OK",
    });
});
router.use('/category',category)
router.use('/product',product)


export default router;
