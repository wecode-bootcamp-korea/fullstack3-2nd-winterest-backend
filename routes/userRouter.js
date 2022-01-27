import express from 'express';
import userController from '../controllers/userController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/kakao', userController.signInKakao);
router.get('/:userNumber', validateToken, userController.getUserInfo);

export default router;
