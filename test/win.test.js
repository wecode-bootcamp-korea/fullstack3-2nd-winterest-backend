import { PrismaClient } from '@prisma/client';
import request, { agent } from 'supertest';
import app from '../server';
import { userData } from '../data/users';
import { winData } from '../data/wins';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.win.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.win.deleteMany();
  await prisma.user.deleteMany();
});

describe('win', () => {
  test('get win list', async () => {
    await prisma.user.createMany({ data: userData });
    await prisma.win.createMany({ data: winData });

    const signup = await agent(app)
      .post('/user/signup')
      .send({
        email: 'dev.taeyeong@gmail.com',
        password: 'asdf1234',
        name: 'Taeyeong',
      })
      .expect(201);

    await request(app)
      .get('/win')
      .expect(200, {
        winList: [
          {
            id: 1,
            title: 'webucks',
            description: 'webucks 상세 페이지 입니다.',
            imageUrl:
              'https://winterest-taeyeong.s3.ap-northeast-2.amazonaws.com/3061642740036937.png',
            createdAt: '2022-01-21T13:40:37.127+00:00',
            updatedAt: null,
            userId: 1,
          },
        ],
      });
  });
});
