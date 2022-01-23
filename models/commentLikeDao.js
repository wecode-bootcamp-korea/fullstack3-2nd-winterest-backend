import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getCommentLikeByCommentIdAndUserId = async (commentId, userId) => {
  const [{ isExist }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        id
      FROM
        comment_like
      WHERE
        comment_id=${commentId}
      AND
        user_id=${userId}
    ) AS isExist
  `;

  return !!isExist;
};

const createLike = async (commentId, userId) => {
  // like 추가
  await prisma.$queryRaw`
    INSERT INTO
      comment_like
      (
        comment_id,
        user_id
      )
    VALUES
    (
      ${commentId},
      ${userId}
    )
  `;

  // comment 테이블에서 like_count 증가
  await prisma.$queryRaw`
    UPDATE
      comment
    SET
      like_count=like_count+1
    WHERE
      comment.id=${commentId}
`;

  return true;
};

const deleteLike = async (commentId, userId) => {
  // like 삭제
  await prisma.$queryRaw`
    DELETE FROM
      comment_like
    WHERE
      comment_id=${commentId}
    AND
      user_id=${userId}
  `;

  // comment 테이블에서 like_count 감소
  await prisma.$queryRaw`
    UPDATE
      comment
    SET
      like_count=like_count-1
    WHERE
      comment.id=${commentId}
  `;

  return true;
};

export default {
  getCommentLikeByCommentIdAndUserId,
  createLike,
  deleteLike,
};
