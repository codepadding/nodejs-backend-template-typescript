import express, { Router } from 'express';
const router: Router = express.Router();
import web from './web'
import admin from './admin'
import adminAuthMiddleware from '../middlewares/admin.auth.middleware';



router.use('/web', web)
router.use('/admin',adminAuthMiddleware, admin)




export default router;
