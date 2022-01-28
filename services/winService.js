import path from 'path';
import aws from 'aws-sdk';
import winDao from '../models/winDao';

aws.config.loadFromPath(path.join(__dirname, '..', '/awsconfig.json'));

const s3 = new aws.S3();

// 게시물 업로드
const uploadWin = async (url, title, desc, boardId, userId, tagName) => {
  const createdWinId = await winDao.createWin(url, title, desc, userId);

  await winDao.createTag(tagName, createdWinId); // tag 추가
  await winDao.createWinOnBoard(createdWinId, boardId);

  return createdWinId;
};

// 게시물 조회
const getWinList = async (pageNumber, tagName) => {
  if (!tagName) {
    const winList = await winDao.readWin(pageNumber);

    return winList;
  } else {
    const tagList = await winDao.searchTag(pageNumber, tagName);

    return tagList;
  }
};

// 게시물 상세 조회
const getWinDetail = async (winId, userId) => {
  const winDetail = await winDao.getWinByWinId(winId);
  const authorId = winDetail.authorId;
  const isFollowing = await winDao.getFollowByUserId(userId, authorId);
  const isSaved = await winDao.getBoardAndWinByWinIdAndUserId(winId, userId);
  const tags = await winDao.getTagByWinId(winId);

  winDetail.isAuthor = authorId === userId;
  winDetail.isFollowing = isFollowing;
  winDetail.isSaved = isSaved;
  winDetail.tags = tags;

  return winDetail;
};

// 게시물 수정
const modifyWin = async (winId, title, desc, boardId, tags, userId) => {
  console.log(winId, title, desc, boardId, tags, userId);
  const author = await winDao.getUserIdByWinId(winId);

  if (author === userId) {
    const curDate = new Date();
    const utc = curDate.getTime() + curDate.getTimezoneOffset() * 60 * 1000;
    const timeDiff = 18 * 60 * 60 * 1000;
    const curDateKorea = new Date(utc + timeDiff);

    await winDao.updateWin(winId, title, desc, curDateKorea);
    const beforeBoardId = await winDao.getBoardIdByWinIdAndUserId(
      winId,
      userId,
    );
    await winDao.updateBoardOnWin(winId, beforeBoardId, boardId);
    await winDao.deleteTagAndWinByWinId(winId);

    for (let tag of tags) {
      const isExistTag = await winDao.getTagByTagName(tag.name);
      if (!isExistTag) await winDao.createTagByTagName(tag.name);
      const tagId = await winDao.getTagIdByTagName(tag.name);
      await winDao.updateTagAndWin(winId, tagId);
    }
  } else {
    const error = new Error('NO_PERMISSION');

    error.statusCode = 400;

    throw error;
  }

  return true;
};

// 게시물 삭제
const deleteWin = async (winId, userId) => {
  const author = await winDao.getUserIdByWinId(winId);

  if (author === userId) {
    const [{ imageUrl: url }] = await winDao.getUrlByWinId(winId);
    const key = url.split('/').pop();

    s3.deleteObject({ Bucket: 'winterest-taeyeong', Key: key }, (err, data) => {
      if (err) console.error(err);
      if (data) console.log(data);
    });

    await winDao.deleteWinByWinId(winId);

    return true;
  } else {
    const error = new Error('NO_PERMISSION');

    error.statusCode = 400;

    throw error;
  }
};

// win 저장
const saveWin = async (winId, boardId, userId) => {
  const isExist = await winDao.getBoardOnWin(winId, userId);

  if (!isExist) {
    await winDao.createWinOnBoard(winId, boardId);

    return true;
  } else {
    const error = new Error('ALREADY_SAVED');

    error.statusCode = 400;

    throw error;
  }
};

const modifySavedWin = async (winId, boardId, userId) => {
  const beforeBoardId = await winDao.getBoardIdByWinIdAndUserId(winId, userId);
  await winDao.updateBoardOnWin(winId, beforeBoardId, boardId);

  return true;
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
