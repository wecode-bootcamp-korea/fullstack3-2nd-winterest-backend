import winService from '../services/winService';

// 게시물 업로드
const uploadWin = async (req, res) => {
  const tagNames = req.body.tagNames;
  const tagName = tagNames.replace(/ /g, '').split(',');

  const createdWinId = await winService.uploadWin(
    req.file.location,
    req.body.title ? req.body.title : null,
    req.body.desc ? req.body.desc : null,
    req.userId,
    tagName,
  );

  return res.status(201).json({ createdWinId });
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
    const { title, desc } = req.body;
    const userId = req.userId;
    await winService.modifyWin(winId, title, desc, userId);

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

export default {
  uploadWin,
  getWinList,
  getWinDetail,
  modifyWin,
  deleteWin,
};
