import express from 'express';
import followController from '../controllers/followController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/', validateToken, followController.clickFollow);

export default router;
