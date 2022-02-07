import boardService from '../services/boardService';

// board 생성
const makeBoard = async (req, res) => {
  try {
    const { boardName } = req.body;
    const userId = req.userId;

    await boardService.makeBoard(boardName, userId);

    return res.status(201).json({ message: 'CREATE_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

// 유저의 board 목록 조회
const getBoardList = async (req, res) => {
  const userId = req.userId;
  const boardList = await boardService.getBoardList(userId);

  return res.status(200).json({ boardList });
};

// 유저의 board 안의 win 조회
const getBoardDetail = async (req, res) => {
  const { pagenumber: pageNumber } = req.query;
  const { boardId } = req.params;
  const boardDetail = await boardService.getBoardDetail(boardId, pageNumber);

  return res.status(200).json({ boardDetail });
};

// board 이름 수정
const editBoardName = async (req, res) => {
  try {
    const { boardId, boardName } = req.body;
    const userId = req.userId;

    await boardService.editBoardName(boardId, boardName, userId);

    return res.status(200).json({ message: 'MODIFY_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

// board 삭제
const deleteBoard = async (req, res) => {
  const { boardId } = req.body;

  await boardService.deleteBoard(boardId);

  return res.status(200).json({ message: 'DELETE_SUCCESS' });
};

export default {
  makeBoard,
  getBoardList,
  getBoardDetail,
  editBoardName,
  deleteBoard,
};
