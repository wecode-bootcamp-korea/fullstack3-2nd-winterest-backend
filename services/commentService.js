import { TokenExpiredError } from 'jsonwebtoken';
import commentDao from '../models/commentDao';

// 댓글 작성
const uploadComment = async (parentId, content, userId, winId) => {
  await commentDao.createComment(parentId, content, userId, winId);

  return true;
};

// 댓글 조회
const getComments = async (winId, parentId, userId) => {
  const comments = await commentDao.getCommentsByWinAndParentId(
    winId,
    parentId,
  );

  if (!comments) return true;

  for (let comment of comments) {
    comment.isLiked = await commentDao.getCommentLikeByCommentIdAndUserId(
      comment.id,
      userId,
    );
    comment.comments = await getComments(winId, comment.id, userId);
  }

  return comments;
};

// 댓글 수정
const modifyComment = async (commentId, content, userId) => {
  const curDate = new Date();
  const utc = curDate.getTime() + curDate.getTimezoneOffset() * 60 * 1000;
  const timeDiff = 18 * 60 * 60 * 1000;
  const curDateKorea = new Date(utc + timeDiff);

  const author = await commentDao.getUserIdBycommentId(commentId);

  if (userId === author) {
    await commentDao.updateComment(commentId, content, curDateKorea);
  } else {
    const error = new Error('NO_PERMISSION');

    error.statusCode = 400;

    throw error;
  }

  return true;
};

// 댓글 삭제
const deleteComment = async (commentId, userId) => {
  const author = await commentDao.getUserIdBycommentId(commentId);

  if (author === userId) {
    const comments = await commentDao.getCommentsByparentId(commentId);
    await commentDao.deleteComment(commentId);

    if (!comments) return true;

    for (let comment of comments) {
      deleteComment(comment.id, comment.userId);
    }
  } else {
    const error = new Error('NO_PERMISSION');

    error.statusCode = 400;

    throw error;
  }

  return true;
};

export default { uploadComment, getComments, modifyComment, deleteComment };
