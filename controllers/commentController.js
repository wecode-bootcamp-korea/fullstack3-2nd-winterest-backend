import commentService from '../services/commentService';

// 댓글 작성
const uploadComment = async (req, res) => {
  const parentId = req.body.parentId ? req.body.parentId : null;
  const { content } = req.body;
  const userId = req.userId;
  const { winId } = req.params;

  await commentService.uploadComment(parentId, content, userId, winId);

  return res.status(201).json({ message: 'CREATE_SUCCESS' });
};

// 댓글 조회
const getComments = async (req, res) => {
  const { winId } = req.params;
  const { userId } = req.query;
  const comments = await commentService.getComments(winId, null, userId);

  return res.status(200).json({ comments });
};

// 댓글 수정
const modifyComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const userId = req.userId;

    await commentService.modifyComment(commentId, content, userId);

    return res.status(200).json({ messge: 'MODIFY_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

// 댓글 삭제
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.userId;

    await commentService.deleteComment(commentId, userId);

    return res.status(200).json({ message: 'DELETE_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

export default { uploadComment, getComments, modifyComment, deleteComment };
