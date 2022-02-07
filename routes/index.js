import express from 'express';
import userRouter from './userRouter';
import winRouter from './winRouter';
import commentRouter from './commentRouter';
import commentLikeRouter from './commentLikeRouter';
import followRouter from './followRouter';
import boardRouter from './boardRouter';
import winLikeRouter from './winLikeRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/win', winRouter);
router.use('/comment', commentRouter);
router.use('/comment-like', commentLikeRouter);
router.use('/follow', followRouter);
router.use('/board', boardRouter);
router.use('/win-like', winLikeRouter);

export default router;
