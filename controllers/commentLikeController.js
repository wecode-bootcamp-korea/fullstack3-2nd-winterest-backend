import commentLikeService from '../services/commentLikeService';

const clickLike = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.userId;

  await commentLikeService.clickLike(commentId, userId);

  return res.status(200).json({ message: 'SUCCESS' });
};

export default { clickLike };
