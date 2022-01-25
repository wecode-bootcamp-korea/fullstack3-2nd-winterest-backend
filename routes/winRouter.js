import express from 'express';
import upload from '../middleware/multer';
import winController from '../controllers/winController';
import validateToken from '../middleware/validateToken';
import validateUser from '../middleware/validateUser';

const router = express.Router();

router.post(
  '/',
  validateToken,
  upload.single('image'),
  winController.uploadWin,
);
router.get('/', winController.getWinList);

router.post('/save', validateToken, winController.saveWin);
router.put('/save', validateToken, winController.modifySavedWin);

router.get('/:winId', validateUser, winController.getWinDetail);
router.put('/:winId', validateToken, winController.modifyWin);
router.delete('/:winId', validateToken, winController.deleteWin);

export default router;
