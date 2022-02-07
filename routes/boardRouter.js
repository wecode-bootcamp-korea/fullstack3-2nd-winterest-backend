import express from 'express';
import boardController from '../controllers/boardController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/', validateToken, boardController.makeBoard);
router.get('/', validateToken, boardController.getBoardList);
router.put('/', validateToken, boardController.editBoardName);
router.delete('/', validateToken, boardController.deleteBoard);
router.get('/:boardId', validateToken, boardController.getBoardDetail);

export default router;
