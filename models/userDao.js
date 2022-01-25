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

const createUser = async (email, hashedPassword, name) => {
  const createUser = await prisma.$queryRaw`
      INSERT INTO
        user (email, password, name)
      VALUES
        (${email}, ${hashedPassword}, ${name})`;

  return createUser;
};

const getUserBySNSId = async id => {
  const [user] = await prisma.$queryRaw`
  SELECT
    user.id,
    sns_id
  FROM
    user
  WHERE
    sns_id=${id}`;

  return user;
};

const createUserBySNSId = async (snsId, nickName) => {
  await prisma.$queryRaw`
      INSERT INTO
        user (sns_id, name)
      VALUES
        (${snsId}, ${nickName})
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

export default {
  getUserByEmail,
  createUser,
  getUserBySNSId,
  createUserBySNSId,
  createBoard,
};
