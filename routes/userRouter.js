import express from 'express';
import userController from '../controllers/userController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/kakao', userController.signInKakao);
router.post('/board', validateToken, userController.getBoardList);
router.get('/info', validateToken, userController.getUserNumber);
router.get('/name', validateToken, userController.getUserName);
router.get('/:userNumber', validateToken, userController.getUserInfo);

export default router;
