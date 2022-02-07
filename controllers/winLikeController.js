import winLikeService from '../services/winLikeService';

const likeWin = async (req, res) => {
  try {
    const { winId } = req.body;
    const userId = req.userId;
    const likeWinQuantity = await winLikeService.likeWin(winId, userId);

    return res.status(201).json({ message: 'SUCCESS', likeWinQuantity });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { likeWin };
