import path from 'path';
import aws from 'aws-sdk';
import winDao from '../models/winDao';

aws.config.loadFromPath(path.join(__dirname, '..', '/awsconfig.json'));

const s3 = new aws.S3();

// 게시물 업로드
const uploadWin = async (url, title, desc, userId, tagName) => {
  const createdWinId = await winDao.createWin(url, title, desc, userId);

  // tag 추가
  const createTag = await winDao.createTag(tagName, createdWinId);

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
const getWinDetail = async winId => {
  const winDetail = await winDao.getWinByWinId(winId);

  return winDetail;
};

// 게시물 수정
const modifyWin = async (winId, title, desc, userId) => {
  const curDate = new Date();
  const utc = curDate.getTime() + curDate.getTimezoneOffset() * 60 * 1000;
  const timeDiff = 18 * 60 * 60 * 1000;
  const curDateKorea = new Date(utc + timeDiff);

  const author = await winDao.getUserIdByWinId(winId);

  if (author === userId) {
    await winDao.updateWin(winId, title, desc, curDateKorea);

    return true;
  } else {
    const error = new Error('NO_PERMISSION');

    error.statusCode = 400;

    throw error;
  }
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

export default {
  uploadWin,
  getWinList,
  getWinDetail,
  modifyWin,
  deleteWin,
};
