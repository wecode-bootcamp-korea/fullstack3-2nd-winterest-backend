import followDao from '../models/followDao';

const clickFollow = async (followerId, followingId) => {
  const isFollowing = await followDao.isFollowing(followerId, followingId);

  if (isFollowing) {
    return await followDao.deleteFollow(followerId, followingId);
  } else {
    return await followDao.createFollow(followerId, followingId);
  }
};

export default { clickFollow };
