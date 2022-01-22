import express from 'express';
import upload from '../middleware/multer';
import winController from '../controllers/winController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post(
  '/',
  validateToken,
  upload.single('image'),
  winController.uploadWin,
);
router.get('/', winController.getWinList);
router.get('/:winId', winController.getWinDetail);
router.put('/:winId', validateToken, winController.modifyWin);
router.delete('/:winId', validateToken, winController.deleteWin);

export default router;
