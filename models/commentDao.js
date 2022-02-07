import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 댓글 작성
const createComment = async (parentId, content, userId, winId) => {
  await prisma.$queryRaw`
    INSERT INTO
      comment
      (
        parent_id,
        content,
        user_id,
        win_id
      )
    VALUES
    (
      ${parentId},
      ${content},
      ${userId},
      ${winId}
    )
  `;

  return true;
};

// 댓글 조회
// 1. winId와 parentId로 댓글 찾기
const getCommentsByWinAndParentId = async (winId, parentId) => {
  const comments = await prisma.$queryRaw`
    SELECT
      comment.id,
      parent_id AS parentId,
      content,
      like_count AS likeCount,
      comment.created_at AS createdAt,
      comment.updated_at AS updatedAt,
      user_id AS authorId,
      win_id AS winId,
      name AS author
    FROM
      comment
    JOIN
      user
    ON
      user.id=comment.user_id
    WHERE
      CASE WHEN ${parentId} is null THEN parent_id is null
      ELSE parent_id=${parentId}
      END
    AND
      comment.win_id=${winId}
  `;

  return comments;
};

// 2. commentId와 userId로 좋아요 클릭 여부 조회
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

// 3. parent id로 user name 조회
const getUserNameByParentId = async parentId => {
  const [parentAuthor] = await prisma.$queryRaw`
    SELECT
      user.name AS parentAuthor
    FROM
      user
    JOIN
      comment
    ON
      user.id=comment.user_id
    WHERE
      comment.id=${parentId}
  `;

  return parentAuthor;
};

// 댓글 수정
const updateComment = async (commentId, content, date) => {
  await prisma.$queryRaw`
    UPDATE
      comment
    SET
      content=${content},
      updated_at=${date}
    WHERE
      comment.id=${commentId}
  `;

  return true;
};

// 댓글 삭제
const deleteComment = async commentId => {
  await prisma.$queryRaw`
    DELETE FROM
      comment
    WHERE
      comment.id=${commentId}
  `;

  return true;
};

// commentId로 userId 가져오기(댓글 수정, 삭제 권한)
const getUserIdBycommentId = async commentId => {
  const [{ userId }] = await prisma.$queryRaw`
    SELECT
      comment.user_id AS userId
    FROM
      comment
    WHERE
      comment.id=${commentId}
  `;

  return userId;
};

// parentId로 Comment찾기
const getCommentsByparentId = async parentId => {
  const comments = await prisma.$queryRaw`
    SELECT
      id,
      user_id AS userId
    FROM
      comment
    WHERE
      parent_id=${parentId}
  `;

  return comments;
};

export default {
  createComment,
  getCommentsByWinAndParentId,
  getCommentLikeByCommentIdAndUserId,
  getUserNameByParentId,
  updateComment,
  getUserIdBycommentId,
  deleteComment,
  getCommentsByparentId,
};
