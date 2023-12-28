import express, { Response, Router } from 'express';
import { getCategory } from '../../controller/category.controller';
import { apiResponse } from '../../utils/apiResponse';
import { CustomRequest } from '../../interface/CustomRequest';
const router: Router = express.Router();



router.get('/',getCategory)
router.get('/:id',getCategory)


export default router;
