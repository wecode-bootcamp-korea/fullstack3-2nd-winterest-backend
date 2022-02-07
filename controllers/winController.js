import winService from '../services/winService';

// 게시물 업로드
const uploadWin = async (req, res) => {
  if (req.file && req.body.boardId && req.body.tagNames) {
    const fileLocation = req.file.location;
    const title = req.body.title ? req.body.title : null;
    const desc = req.body.desc ? req.body.desc : null;
    const { boardId } = req.body;
    const userId = req.userId;
    const tagNames = req.body.tagNames;

    await winService.uploadWin(
      fileLocation,
      title,
      desc,
      boardId,
      userId,
      tagNames.split(','),
    );

    return res.status(201).json({ message: 'CREATE_SUCCESS' });
  } else {
    return res.status(400).json({ message: 'KEY_ERROR' });
  }
};

// 전체 게시물 및 tag 게시물 조회
const getWinList = async (req, res) => {
  const { pagenumber: pageNumber, tagname: tagName } = req.query;
  const winList = await winService.getWinList(
    pageNumber,
    tagName === 'undefined' ? undefined : tagName,
  );

  return res.status(200).json({ winList });
};

// 게시물 상세 조회
const getWinDetail = async (req, res) => {
  const winId = req.params.winId;
  const userId = req.userId;
  const winDetail = await winService.getWinDetail(winId, userId);

  return res.status(200).json({ winDetail });
};

// 게시물 수정
const modifyWin = async (req, res) => {
  try {
    const winId = req.params.winId;
    const { title, desc, boardId, tags } = req.body;
    const userId = req.userId;

    await winService.modifyWin(winId, title, desc, boardId, tags, userId);

    return res.status(200).json({ message: 'MODIFY_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

// 게시물 삭제
const deleteWin = async (req, res) => {
  try {
    const winId = req.params.winId;
    const userId = req.userId;

    await winService.deleteWin(winId, userId);

    return res.status(200).json({ message: 'DELETE_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

// win 저장
const saveWin = async (req, res) => {
  try {
    const { winId, boardId } = req.body;
    const userId = req.userId;

    await winService.saveWin(winId, boardId, userId);

    return res.status(201).json({ message: 'SAVE_SUCCESS' });
  } catch (err) {
    console.log(err);

    return res.status(err.statusCode).json({ message: err.message });
  }
};

const modifySavedWin = async (req, res) => {
  const { winId, boardId } = req.body;
  const userId = req.userId;

  await winService.modifySavedWin(winId, boardId, userId);

  return res.status(200).json({ message: 'MODIFY_SUCCESS' });
};

export default {
  uploadWin,
  getWinList,
  getWinDetail,
  modifyWin,
  deleteWin,
  saveWin,
  modifySavedWin,
};
