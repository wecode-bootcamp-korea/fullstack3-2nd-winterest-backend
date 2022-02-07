import commentLikeDao from '../models/commentLikeDao';

const clickLike = async (commentId, userId) => {
  const comment = await commentLikeDao.getCommentLikeByCommentIdAndUserId(commentId, userId)

  if (comment) {
    await commentLikeDao.deleteLike(commentId, userId);
  } else {
    await commentLikeDao.createLike(commentId, userId);
  }

  return true;
};

export default { clickLike };
