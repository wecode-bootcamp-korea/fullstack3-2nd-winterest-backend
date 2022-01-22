import express from 'express';
import userRouter from './userRouter';
import winRouter from './winRouter';
import commentRouter from './commentRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/win', winRouter);
router.use('/comment', commentRouter);

export default router;
