import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// board 이름과 user id로 board가 존재하는지 찾기
const getBoardByBoardNameAndUserId = async (boardName, userId) => {
  const [{ isExist }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        id
      FROM
        board
      WHERE
        name=${boardName}
      AND
        user_id=${userId}
    ) AS isExist
  `;

  return !!isExist;
};

// board 생성
const createBoard = async (boardName, userId) => {
  await prisma.$queryRaw`
    INSERT INTO
      board
      (
        name,
        user_id
      )
    VALUES
    (
      ${boardName},
      ${userId}
    )
  `;

  return true;
};

// 유저 id로 board 목록 조회
const getBoardListByUserId = async userId => {
  const boardLIst = await prisma.$queryRaw`
    SELECT
      id,
      name
    FROM
      board
    WHERE
      board.user_id=${userId}
  `;

  return boardLIst;
};

// boardId로 boardName 조회
const getboardNameByBoardId = async boardId => {
  const [boardName] = await prisma.$queryRaw`
    SELECT
      board.name
    FROM
      board
    WHERE
      board.id=${boardId}
  `;

  return boardName;
};

// boardId로 win 조회
const getWinByBoardId = async (boardId, pageNumber) => {
  const wins = await prisma.$queryRaw`
    SELECT
      win.id,
      win.title,
      win.description,
      win.image_url AS imageUrl,
      win.created_at AS createdAt,
      win.updated_at AS updatedAt,
      win.user_id AS author
    FROM
      win
    JOIN
      board_and_win
    ON
      win.id=board_and_win.win_id
    WHERE
      board_id=${boardId}
    ORDER BY
      id
    DESC
    LIMIT 10 OFFSET ${(pageNumber - 1) * 10} 
  `;

  return wins;
};

// board 이름 수정
const updateBoard = async (boardId, boardName, date) => {
  await prisma.$queryRaw`
    UPDATE
      board
    SET
      board.name=${boardName},
      updated_at=${date}
    WHERE
      board.id=${boardId}
  `;

  return true;
};

// board id로 board의 작성자 조회
const getUserIdByBoardId = async boardId => {
  const [{ author }] = await prisma.$queryRaw`
    SELECT
      user_id AS author
    FROM
      board
    WHERE
      board.id=${boardId}
  `;

  return author;
};

// board 삭제
const deleteBoard = async boardId => {
  await prisma.$queryRaw`
    DELETE FROM
      board
    WHERE
      board.id=${boardId}
  `;

  return true;
};

const getBoardByUserNumber = async userNumber => {
  const boardList = await prisma.$queryRaw`
    SELECT
      board.id,
      board.name
    FROM
      board
    JOIN
      user
    ON
      board.user_id = user.id
    WHERE
      user.user_number = ${userNumber}
  `;

  return boardList;
};

export default {
  getBoardByBoardNameAndUserId,
  getBoardListByUserId,
  createBoard,
  getboardNameByBoardId,
  getWinByBoardId,
  updateBoard,
  getUserIdByBoardId,
  deleteBoard,
};
