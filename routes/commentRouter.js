import express from 'express';
import commentController from '../controllers/commentController';
import validateToken from '../middleware/validateToken';
import validateUser from '../middleware/validateUser';

const router = express.Router(commentController);

router.post('/:winId', validateToken, commentController.uploadComment);
router.get('/:winId', validateUser, commentController.getComments);
router.put('/', validateToken, commentController.modifyComment);
router.delete('/', validateToken, commentController.deleteComment);

export default router;
