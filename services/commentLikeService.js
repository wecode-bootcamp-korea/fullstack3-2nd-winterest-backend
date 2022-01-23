import commentLikeDao from '../models/commentLikeDao';

const clickLike = async (commentId, userId) => {
  if (
    await commentLikeDao.getCommentLikeByCommentIdAndUserId(commentId, userId)
  ) {
    await commentLikeDao.deleteLike(commentId, userId);
  } else {
    await commentLikeDao.createLike(commentId, userId);
  }

  return true;
};

export default { clickLike };
