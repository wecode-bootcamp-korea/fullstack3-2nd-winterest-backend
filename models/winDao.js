import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 게시물 업로드
// 1. 게시물 생성
const createWin = async (imageUrl, title, desc, userId) => {
  await prisma.$queryRaw`
    INSERT INTO
      win
      (
        title,
        description,
        image_url,
        user_id
      )
    VALUES
    (
      ${title},
      ${desc},
      ${imageUrl},
      ${userId}
    )
  `;

  // 생성된 win의 id를 리턴
  const [{ id }] = await prisma.$queryRaw`
    SELECT
      id
    FROM
      win
    ORDER BY
      id
    DESC
    LIMIT 1
  `;

  return id;
};

// tag를 DB에 저장
const createTag = async (tagName, createdWinId) => {
  const tagNameIds = [];

  for (let i = 0; i < tagName.length; i++) {
    const [createTag] = await prisma.$queryRaw`
    INSERT IGNORE INTO
      tag (name)
    VALUES
      (${tagName[i]})
    `;
    const [tagNameId] = await prisma.$queryRaw`
    SELECT 
      id
    FROM
      tag
    WHERE
      name=${tagName[i]}
    `;
    tagNameIds.push(tagNameId.id);

    const [tagAndWin] = await prisma.$queryRaw`
    INSERT INTO
      tag_and_win (tag_id, win_id)
    VALUES
      (${tagNameIds[i]}, ${createdWinId})
    `;
  }

  return true;
};

// 2. 게시물을 board에 등록
const createWinOnBoard = async (winId, boardId) => {
  await prisma.$queryRaw`
    INSERT INTO
      board_and_win
      (
        win_id,
        board_id
      )
    VALUES
    (
      ${winId},
      ${boardId}
    )
  `;
};

// 게시물 조회 (10개씩)
const readWin = async pageNumber => {
  const winList = await prisma.$queryRaw`
    SELECT
      win.id,
      win.title,
      win.description,
      win.image_url AS imageUrl,
      win.created_at AS createdAt,
      win.updated_at AS updatedAt,
      win.user_id AS userId,
      user.name AS userName,
      user.user_number AS userNumber
    FROM
      win
    INNER JOIN
      user
    ON
      user.id = win.user_id 
    ORDER BY
      id
    DESC
    LIMIT 10 OFFSET ${(pageNumber - 1) * 10}
  `;

  return winList;
};

// tag 게시물 조회 (10개씩)
const searchTag = async (pageNumber, tagName) => {
  const tagList = await prisma.$queryRaw`
  SELECT
    win.id,
    win.title,
    win.description,
    win.image_url AS imageUrl,
    win.created_at AS createdAt,
    win.updated_at AS updatedAt,
    win.user_id AS userId,
    user.name AS userName,
    user.user_number AS userNumber
  FROM
    win
  INNER JOIN
    tag_and_win
  ON 
    win.id = tag_and_win.win_id
  INNER JOIN
    tag
  ON
    tag.id = tag_and_win.tag_id
  INNER JOIN
    user
  ON
    user.id = win.user_id 
  WHERE
    tag.name = ${tagName}
  ORDER BY
    id  
  DESC
  LIMIT 10 OFFSET ${(pageNumber - 1) * 10}
  `;
  return tagList;
};

// 게시물 상세 조회
const getWinByWinId = async winId => {
  const [winDetail] = await prisma.$queryRaw`
    SELECT
      win.id,
      title,
      description,
      image_url AS imageUrl,
      win.created_at AS createdAt,
      win.updated_at AS updateAt,
      user_id AS authorId,
      user.name AS author,
      user.follower_count AS followerCount
    FROM
      win
    JOIN
      user
    ON
      win.user_id=user.id
    WHERE
      win.id=${winId}
  `;

  return winDetail;
};

// 게시물의 tag 조회
const getTagByWinId = async winId => {
  const tags = await prisma.$queryRaw`
    SELECT
      tag.name
    FROM
      win
    JOIN
      tag_and_win
    ON
      win.id=tag_and_win.win_id
    JOIN
      tag
    ON
      tag_and_win.tag_id=tag.id
    WHERE
      win.id=${winId}
  `;

  return tags;
};

// 저장된 게시물인지 조회
const getBoardAndWinByWinIdAndUserId = async (winId, userId) => {
  const isSaved = await prisma.$queryRaw`
    SELECT
      board.name
    FROM
      board_and_win
    JOIN
      board
    ON
      board_and_win.board_id=board.id
    WHERE
      board_and_win.win_id=${winId}
    AND
      board.user_id=${userId}
  `;

  return isSaved;
};

// 게시물 수정
// 1. 게시물 수정(board 빼고)
const updateWin = async (winId, title, desc, date) => {
  await prisma.$queryRaw`
    UPDATE
      win
    SET
      title=${title},
      description=${desc},
      updated_at=${date}
    WHERE
      win.id=${winId}
  `;

  return true;
};

// 2. 게시물의 board id 조회
const getBoardIdByWinId = async winId => {
  const boardId = await prisma.$queryRaw`
    SELECT
      board_id
    FROM
      board_and_win
    WHERE
      win_id=${winId}
  `;

  return boardId;
};

// 3. 게시물의 board id 수정
const updateBoardOnWin = async (winId, boardId) => {
  await prisma.$queryRaw`
    UPDATE
      board_and_win
    SET
      board_id=${boardId}
    WHERE
      win_id=${winId}
  `;

  return true;
};

// 게시물 삭제
// 1. 게시물 id로 이미지 url 조회
const getUrlByWinId = async winId => {
  const url = await prisma.$queryRaw`
    SELECT
      image_url AS imageUrl
    FROM
      win
    WHERE
      win.id=${winId}
  `;

  return url;
};

// 2. 게시물 id로 게시물 삭제
const deleteWinByWinId = async winId => {
  await prisma.$queryRaw`
    DELETE FROM
      win
    WHERE
      win.id=${winId}
  `;

  return true;
};

// winId로 userId(작성자) 가져오기 (게시물 수정, 삭제)
const getUserIdByWinId = async winId => {
  const [{ userId }] = await prisma.$queryRaw`
    SELECT
      win.user_id AS userId
    FROM
      win
    WHERE
      id=${winId}
  `;

  return userId;
};

// 저장된 win인지 확인
const getBoardOnWin = async (winId, userId) => {
  const [{ isExist }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        *
      FROM
        user
      JOIN
        board
      ON
        user.id=board.user_id
      JOIN
        board_and_win
      ON
        board.id=board_and_win.board_id
      WHERE
        user.id=${userId}
      AND
        board_and_win.win_id=${winId}
    ) AS isExist
  `;

  return !!isExist;
};

const getFollowByUserId = async (followerId, followingId) => {
  const [{ isFollowing }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        *
      FROM
        follow
      WHERE
        follower_id=${followerId}
      AND
        following_id=${followingId}
    ) AS isFollowing
  `;

  return !!isFollowing;
};

export default {
  createWin,
  createWinOnBoard,
  readWin,
  searchTag,
  getWinByWinId,
  updateBoardOnWin,
  getTagByWinId,
  getBoardAndWinByWinIdAndUserId,
  updateWin,
  getBoardIdByWinId,
  getUrlByWinId,
  deleteWinByWinId,
  getUserIdByWinId,
  createTag,
  getBoardOnWin,
  getFollowByUserId,
};
