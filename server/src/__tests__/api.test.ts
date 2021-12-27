process.env.NODE_ENV = 'test';
import request from 'supertest';
import db from '../db/connection';
// import * as app from '../index';
// import matchers from 'jest-extended';

// const request = require('supertest');
// const db = require('./../db/connection');
// const app = require('../index');
const matchers = require('jest-extended');

describe('user', () => {
  let app;

  beforeAll(async () => {
    expect.extend(matchers);
    const mod = await import ('../index');
    app = (mod as any).default; 
  });

  afterAll(() => {
    db.destroy();
  });

  const VALID_USER_RESPONSE_FIELDS = [
    'id',
    'user_name',
    'email',
    'first_name',
    'last_name',
  ];

  describe('signup', () => {
    it('signs up a new user', async () => {
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send({
          user_name: 'user01',
          email: 'testing@gmail.com',
          password: 'testing123',
          first_name: 'Joe',
          last_name: 'Smith',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const { user, token } = res.body;
      expect(user).toBeObject();
      expect(user).toContainKeys(VALID_USER_RESPONSE_FIELDS);
      expect(token).toBeString();
    });
  });

  describe('signin', () => {
    let res;

    const loginUser = async () =>
      await request(app)
        .post('/api/v1/users/signin')
        .send({
          user_name: 'user01',
          password: 'testing123',
        })
        .set('Accept', 'application/json');

    it('/users/signin returns 400 w/ invalid user', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .send({
          user_name: 'totally_not_a_user_name',
          password: 'NOPE',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('/users/signin returns 400 w/ bad pw', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .send({
          user_name: 'user01',
          password: 'NOPE',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('/users/current returns 403 on no auth', async () => {
      await request(app).get('/api/v1/users/current').expect(403);
    });

    beforeEach(async () => {
      res = await loginUser();
    });

    it('/users/signin returns 200 on good credentials', () => {
      expect(res.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
      expect(res.statusCode).toBe(200);

      const { user, token } = res.body;
      expect(user).toContainKeys(VALID_USER_RESPONSE_FIELDS);
      expect(user).not.toContainKeys(['password', 'password_hash']);
      expect(token).toBeString();
    });

    it('/users/current returns 200 with auth', async () => {
      const { user, token } = res.body;
      res = await request(app)
        .get('/api/v1/users/current')
        .set('Authorization', 'Bearer ' + token)
        .expect(200);
      expect(res?.body).toContainKeys(VALID_USER_RESPONSE_FIELDS);
      expect(res?.body).not.toContainKeys(['password', 'password_hash']);
      expect(res.body.id).toEqual(user.id);
      expect(res.body.email).toEqual(user.email);
    });
  });
});
