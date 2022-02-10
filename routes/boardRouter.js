import express from 'express';
import boardController from '../controllers/boardController';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post('/', validateToken, boardController.makeBoard);
router.get('/', validateToken, boardController.getBoardList);
router.get('/user-board', validateToken, boardController.getBoardByUserNumber);
router.put('/:boardId', validateToken, boardController.editBoardName);
router.delete('/:boardId', validateToken, boardController.deleteBoard);
router.get('/:boardId', validateToken, boardController.getBoardDetail);

export default router;
