import express from 'express';
import rateLimit from 'express-rate-limit';
import upload from '../middleware/multer';
import winController from '../controllers/winController';
import validateToken from '../middleware/validateToken';
import validateUser from '../middleware/validateUser';

const router = express.Router();

router.post(
  '/',
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
  }),
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
