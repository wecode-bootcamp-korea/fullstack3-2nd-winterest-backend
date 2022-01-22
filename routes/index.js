import express from 'express';
import userRouter from './userRouter';
import winRouter from './winRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/win', winRouter);

export default router;
