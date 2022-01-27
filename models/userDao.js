import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUserByEmail = async email => {
  const [user] = await prisma.$queryRaw`
    SELECT
      user.id,
      email,
      password,
      name
    FROM
      user
    WHERE
      email=${email}
    `;

  return user;
};

const createUser = async (email, hashedPassword, name, userNumber) => {
  const createUser = await prisma.$queryRaw`
      INSERT INTO
        user (email, password, name, user_number)
      VALUES
        (${email}, ${hashedPassword}, ${name}, ${userNumber})`;

  return createUser;
};

const getUserBySNSId = async snsId => {
  const [user] = await prisma.$queryRaw`
  SELECT
    user.id,
    sns_id
  FROM
    user
  WHERE
    sns_id=${snsId}`;

  return user;
};

const createUserBySNSId = async (snsId, nickName, userNumber) => {
  await prisma.$queryRaw`
      INSERT INTO
        user (sns_id, name, user_number)
      VALUES
        (${snsId}, ${nickName}, ${userNumber})
      `;

  const [userId] = await prisma.$queryRaw`
  SELECT 
    user.id
  FROM
    user
  WHERE
    sns_id=${snsId}`;

  return userId;
};

const createBoard = async userId => {
  return await prisma.$queryRaw`
  INSERT INTO
    board
    (
      name,
      user_id
    )
  VALUES
  (
    "보드", ${userId}
  )
  `;
};

const getUserByUserNumber = async userNumber => {
  const [userInfo] = await prisma.$queryRaw`
    SELECT
      user.id,
      user.name,
      follower_count AS followerCount,
      email
    FROM
      user
    WHERE
      user.user_number = ${userNumber}
  `;

  return userInfo;
};

export default {
  getUserByEmail,
  createUser,
  getUserBySNSId,
  createUserBySNSId,
  createBoard,
  getUserByUserNumber,
};
