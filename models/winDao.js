import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 게시물 생성
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

// 게시물 조회 (10개씩)
const readWin = async pageNumber => {
  const winList = await prisma.$queryRaw`
    SELECT
      id,
      title,
      description,
      image_url AS imageUrl,
      created_at AS createdAt,
      updated_at AS updatedAt,
      user_id AS userId
    FROM
      win
    ORDER BY
      id
    DESC
    LIMIT 10 OFFSET ${(pageNumber - 1) * 10}
  `;

  return winList;
};

// 게시물 상세 조회
const getWinByWinId = async winId => {
  const winDetail = await prisma.$queryRaw`
    SELECT
      id,
      title,
      description,
      image_url AS imageUrl,
      created_at AS createdAt,
      updated_at AS updateAt,
      user_id AS userId
    FROM
      win
    WHERE
      win.id=${winId}
  `;

  return winDetail;
};

// 게시물 수정
const updateWin = async (winId, title, desc, date) => {
  await prisma.$queryRaw`
    UPDATE
      win
    SET
      title=${title},
      description=${desc},
      created_at=${date}
    WHERE
      win.id=${winId}
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

export default {
  createWin,
  readWin,
  getWinByWinId,
  updateWin,
  getUrlByWinId,
  deleteWinByWinId,
  getUserIdByWinId,
};
