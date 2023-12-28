import express from 'express';
import { getUserInformation,updateAuth, } from '../../controller/user.controller';

const router = express.Router();

router.get('/', getUserInformation)
router.post('/',updateAuth)



export default router;