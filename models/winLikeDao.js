import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getWinLikeByWinIdAndUserId = async (winId, userId) => {
  const [{ isExist }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        id
      FROM
        win_like
      WHERE
        win_id=${winId}
      AND
        user_id=${userId}
    ) AS isExist`;
  return !!isExist;
};

const deleteLike = async (winId, userId) => {
  await prisma.$queryRaw`
    DELETE FROM
      win_like
    WHERE
      win_id=${winId}
    AND
      user_id=${userId}`;

  await prisma.$queryRaw`
    UPDATE 
      win
    SET
      like_count=like_count-1
    WHERE 
      win.id=${winId}
      `;

  const [quantity] = await prisma.$queryRaw`
    SELECT
      win.like_count
    FROM
      win
    WHERE
      win.id=${winId}`;
  return quantity.like_count;
};

const createLike = async (winId, userId) => {
  await prisma.$queryRaw`
    INSERT INTO
      win_like
      (
        win_id, user_id
      )
    VALUES
    (
      ${winId}, ${userId}
    )`;

  await prisma.$queryRaw`
    UPDATE
      win
    SET
      like_count=like_count+1
    WHERE
      win.id=${winId}
      `;

  const [quantity] = await prisma.$queryRaw`
    SELECT
      win.like_count
    FROM
      win
    WHERE
      win.id=${winId}`;
  return quantity.like_count;
};

const isHeart = async (winId, userId) => {
  const [{ heart }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        id
      FROM
        win_like
      WHERE
        win_id=${winId}
      AND
        user_id=${userId}
    ) AS heart`;
  return !!heart;
};

export default {
  getWinLikeByWinIdAndUserId,
  deleteLike,
  createLike,
  isHeart,
};
