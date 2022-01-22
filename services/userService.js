import userDao from '../models/userDao';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

const signUp = async (email, password, name) => {
  const user = await userDao.getUserByEmail(email);

  if (user) {
    const error = new Error('EXISTED_USER');
    error.statusCode = 409;

    throw error;
  }

  const checkId = email.includes('@') ? true : false;
  const checkPw = password.length >= 6 ? true : false;

  if (!checkId || !checkPw) {
    const error = new Error('CHECK YOUR EMAIL OR PASSWORD');
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

export default { signUp, signIn };
