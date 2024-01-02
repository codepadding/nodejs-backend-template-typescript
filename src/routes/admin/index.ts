import express, { Response, Router } from 'express';
import { CustomRequest } from '../../interface/CustomRequest';
import { apiResponse } from '../../utils/apiResponse';
import productRoute from './product.routes'

const router: Router = express.Router();

router.get('/', (req: CustomRequest, res: Response) => {
    return apiResponse({
        res,
        message: "OK",
    });
});

router.use('/product',productRoute);

export default router;
