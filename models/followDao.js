import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isFollowing = async (followerId, followingId) => {
  const [{ isFollowing }] = await prisma.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        *
      FROM
        follow
      WHERE
        follower_id=${followerId}
      AND
        following_id=${followingId}
    ) AS isFollowing
  `;

  return !!isFollowing;
};

const createFollow = async (followerId, followingId) => {
  await prisma.$queryRaw`
    INSERT INTO
      follow
      (
        follower_id,
        following_id
      )
    VALUES
    (
      ${followerId},
      ${followingId}
    )
  `;

  return prisma.$queryRaw`
    UPDATE
      user
    SET
      user.follower_count=user.follower_count+1
    WHERE
      user.id=${followingId}
  `;
};

const deleteFollow = async (followerId, followingId) => {
  await prisma.$queryRaw`
    DELETE FROM
      follow
    WHERE
      follower_id=${followerId}
    AND
      following_id=${followingId}
  `;

  return prisma.$queryRaw`
    UPDATE
      user
    SET
      user.follower_count=user.follower_count-1
    WHERE
      user.id=${followingId}
  `;
};

export default { isFollowing, createFollow, deleteFollow };
