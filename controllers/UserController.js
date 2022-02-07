import { prisma } from '@prisma/client';
import userService from '../services/userService';

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const REQUIRED_KEYS = { email, password, name };
    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(409).json({ message: 'KEY_ERROR' });
      }
    }

    await userService.signUp(email, password, name);

    const accessToken = await userService.signIn(email, password); // userService에 별도의 함수를 만들것. signup시의 token 확보용

    return res
      .status(201)
      .json({ message: 'CREATE_SUCCESS', token: accessToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const REQUIRED_KEYS = { email, password };
    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(409).json({ message: 'KEY_ERROR' });
      }
    }

    const accessToken = await userService.signIn(email, password);

    return res
      .status(201)
      .json({ message: 'LOGIN_SUCCESS', token: accessToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signInKakao = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({ message: 'INVALID_KAKAO_TOKEN' });
    }
    // accessToken이 있으면 winterest token 받아오기 진행
    const accessTokenWinterest = await userService.signInKakao(accessToken);

    return res
      .status(201)
      .json({ message: 'LOGIN_SUCCESS', accessToken: accessTokenWinterest });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.userId;
  const { userNumber } = req.params;
  const userInfo = await userService.getUserInfo(userId, userNumber);

  return res.status(200).json({ userInfo });
};

const getBoardList = async (req, res) => {
  const { userNumber } = req.body;

  const boardList = await userService.getBoardList(userNumber);

  return res.status(200).json({ boardList });
};

const getUserNumber = async (req, res) => {
  const userId = req.userId;
  const userNumber = await userService.getUserNumber(userId);

  return res.status(200).json({ userNumber });
};

const getUserName = async (req, res) => {
  const userId = req.userId;
  const userName = await userService.getUserName(userId);

  return res.status(200).json({ userName });
};

export default {
  signUp,
  signIn,
  signInKakao,
  getUserInfo,
  getBoardList,
  getUserNumber,
  getUserName,
};
