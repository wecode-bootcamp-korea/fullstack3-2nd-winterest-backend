import express from 'express';
import commentLikeController from '../controllers/commentLikeController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/', validateToken, commentLikeController.clickLike);

export default router;
