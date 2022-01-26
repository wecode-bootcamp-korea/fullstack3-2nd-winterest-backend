import winLikeDao from '../models/winLikeDao';

const likeWin = async (winId, userId) => {
  if (await winLikeDao.getWinLikeByWinIdAndUserId(winId, userId)) {
    return await winLikeDao.deleteLike(winId, userId);
  } else {
    return await winLikeDao.createLike(winId, userId);
  }
};

export default { likeWin };
