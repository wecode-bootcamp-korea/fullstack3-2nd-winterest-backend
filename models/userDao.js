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
  await prisma.$transaction([
    prisma.$queryRaw``,  // insert into 로 User 가입
    prisma.$executeRaw``, // user Id select
    prisma.$queryRaw`` // board를 생성하는 Insert into
  ])
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

const getBoardByUserNumber = async userNumber => {
  const boardList = await prisma.$queryRaw`
    SELECT
      board.id,
      board.name
    FROM
      board
    JOIN
      user
    ON
      board.user_id = user.id
    WHERE
      user.user_number = ${userNumber}
  `;

  return boardList;
};

const getFollowByUserId = async (followerId, followingId) => {
  const [{ isFollowing }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        *
      FROM
        follow
      WHERE
        follower_id = ${followerId}
      AND
        following_id = ${followingId}
    ) AS isFollowing
  `;

  return !!isFollowing;
};

const getUserNumberByUserId = async userId => {
  const [{ userNumber }] = await prisma.$queryRaw`
    SELECT
      user.user_number AS userNumber
    FROM
      user
    WHERE
      user.id = ${userId}
  `;

  return userNumber;
};

const getUserNameByUserId = async userId => {
  const [{ userName }] = await prisma.$queryRaw`
    SELECT
      user.name AS userName
    FROM
      user
    WHERE
      user.id = ${userId}
  `;

  return userName;
};

export default {
  getUserByEmail,
  createUser,
  getUserBySNSId,
  createUserBySNSId,
  createBoard,
  getUserByUserNumber,
  getBoardByUserNumber,
  getFollowByUserId,
  getUserNumberByUserId,
  getUserNameByUserId,
};
