import followService from '../services/followService';

const clickFollow = async (req, res) => {
  const userId = req.userId;
  const { followingId } = req.body;

  await followService.clickFollow(userId, followingId);

  return res.status(201).json({ message: 'CLICK_SUCCESS' });
};

export default { clickFollow };
