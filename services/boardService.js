import boardDao from '../models/boardDao';

// board 생성
const makeBoard = async (boardName, userId) => {
  const isExist = await boardDao.getBoardByBoardNameAndUserId(
    boardName,
    userId,
  );

  if (!isExist) {
    await boardDao.createBoard(boardName, userId);
  } else {
    const error = new Error('ALREADY_EXIST');

    error.statusCode = 400;

    throw error;
  }

  return true;
};

// 유저 board 목록 조회
const getBoardListByUserId = async userId => {
  return await boardDao.getBoardListByUserId(userId);
};

// 유저 board의 win 목록 조회
const getBoardDetail = async (boardId, pageNumber) => {
  const boardName = await boardDao.getboardNameByBoardId(boardId);
  const wins = await boardDao.getWinByBoardId(boardId, pageNumber);

  if (wins.length !== 0) boardName.wins = wins;

  return boardName;
};

// board 이름 수정
const editBoardName = async (boardId, boardName, userId) => {
  const author = await boardDao.getUserIdByBoardId(boardId);

  const isExist = await boardDao.getBoardByBoardNameAndUserId(
    boardName,
    userId,
  );

  if (author !== userId) {
    const error = new Error('NO_PERMISSION');
    error.statusCode = 400;
    throw error;
  }

  if (isExist) {
    const error = new Error('ALREADY_EXIST');
    error.statusCode = 400;
    throw error;
  }

  // if (author === userId && !isExist) { // 정상 케이스를 if문 에 넣어두는 것이 어색합니다 :)
  const curDate = new Date();
  const utc = curDate.getTime() + curDate.getTimezoneOffset() * 60 * 1000;
  const timeDiff = 18 * 60 * 60 * 1000;
  const curDateKorea = new Date(utc + timeDiff);

  await boardDao.updateBoard(boardId, boardName, curDateKorea);

  return true;
  // } else if (author !== userId) {
  //   const error = new Error('NO_PERMISSION');

  //   error.statusCode = 400;

  //   throw error;
  // } else {
  //   const error = new Error('ALREADY_EXIST');

  //   error.statusCode = 400;

  //   throw error;
  // }
};

// board 삭제
const deleteBoard = async boardId => {
  await boardDao.deleteBoard(boardId);

  return true;
};

export default {
  makeBoard,
  getBoardList,
  getBoardDetail,
  editBoardName,
  deleteBoard,
};
