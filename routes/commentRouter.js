import { HttpRequest } from 'aws-sdk';
import express from 'express';
import commentController from '../controllers/commentController';
import validateToken from '../middleware/validateToken';
import validateUser from '../middleware/validateUser';

const router = express.Router(commentController);

router.post('/', validateToken, commentController.uploadComment);
    // -> winId를 Body로 받거나 Querystring으로 받도록 수정
		// http://localhost:8000/comment (body)
		// ...................../comment?winId=1
router.get('/', validateUser, commentController.getComments);
    // http://localhost:8000/comment?windId=1
router.put('/:commentId', validateToken, commentController.modifyComment);
router.delete('/:commentId', validateToken, commentController.deleteComment);

export default router;

// comment-like & comment
// win-like & win
// 모듈 합쳐도 좋습니다.