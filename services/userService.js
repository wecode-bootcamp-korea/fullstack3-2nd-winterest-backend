import userDao from '../models/userDao';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import boardDao from '../models/boardDao';

const { SECRET } = process.env;

const signUp = async (email, password, name) => {
  const user = await userDao.getUserByEmail(email);

  if (user) {
    const error = new Error('EXISTED_USER');
    error.statusCode = 409;

    throw error;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  return await userDao.createUser(email, hashedPassword, name);
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const err = new Error('INVALID_USER');
    err.statusCode = 400;

    throw err;
  }

  const validatePw = bcrypt.compareSync(password, user.password);

  if (!validatePw) {
    const err = new Error('INVALID_USER');
    err.statusCode = 400;

    throw err;
  }

  const accessToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

  return accessToken;
};

const signInKakao = async accessToken => {
  // accessToken으로 kakao API에 접근하여 사용자 정보 취득
  const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (!user.data) {
    const err = new Error('INVALID_USER');
    err.statusCode = 400;

    throw err;
  }

  // 해당 사용자가 winterest 서버에 존재하는지 여부 확인
  const userCheck = await userDao.getUserBySNSId(user.data.id);

  // 등록되지 않은 사용자라면 winterest 서버에 등록
  if (!userCheck) {
    const createUser = await userDao.createUserBySNSId(
      user.data.id,
      user.data.properties.nickname,
    );

    await userDao.createBoard(createUser.id);
  }

  const accessTokenWinterest = jwt.sign({ id: userCheck.id }, SECRET, {
    expiresIn: '1h',
  });

  return accessTokenWinterest;
};

export default { signUp, signIn, signInKakao };
