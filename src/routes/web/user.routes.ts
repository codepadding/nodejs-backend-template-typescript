import express, { Response } from 'express';
import { apiResponse } from '../../utils/apiResponse';
import { CustomRequest } from '../../interface/CustomRequest';

const router = express.Router();

router.get('/', (req: CustomRequest, res: Response) => {
    return apiResponse({
        res,
        message: "OK",
    });
});




export default router;