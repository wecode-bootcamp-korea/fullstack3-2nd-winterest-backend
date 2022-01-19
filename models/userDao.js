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

export default { getUserByEmail, createUser };
