const mongoose = require('mongoose');
const request = require('supertest');
const dbSetup = require('../db');
const app = require('../app');

beforeAll(() => {
  dbSetup();
});

afterAll((done) => {
  mongoose.disconnect();
  return done();
});

describe('GET /api/v1/users', () => {
  it('should return users', async (done) => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200);

    done();
  });
});

let user = {
  email: 'asdf@gmail.com',
  username: '12333123',
  password: '5eb97169c52dba26f4cfe0bd',
  id: '5ebd19b1064e27211c643656',
};

// describe('POST /api/v1/users/signup', () => {
//   it('should return created user', async (done) => {
//     const response = await request(app)
//       .post('/api/v1/users/signup')
//       .send(user)
//       .expect('Content-Type', /json/)
//       .expect(201);

//     expect(response.body.email).toEqual(user.email);

//     user.id = response.body.userId;

//     done();
//   });
// });

describe('GET /api/v1/users/:userId', () => {
  it('should return user', async (done) => {
    const response = await request(app)
      .get(`/api/v1/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.id).toEqual(user.id);
    expect(response.body.token).not.toBeNull();

    done();
  });

  it('should return no user error', async (done) => {
    const response = await request(app)
      .get(`/api/v1/users/nosuchuser`)
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});

describe('POST /api/v1/users/signin', () => {
  it('should return signed in user', async (done) => {
    const body = {
      email: user.email,
      password: user.password,
    };

    const response = await request(app)
      .post('/api/v1/users/signin')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.email).toEqual(body.email);
    expect(response.body.token).not.toBeNull();

    done();
  });

  it('should return wrong credentials error', async (done) => {
    const body = {
      email: 'sadfasdfsadfsa',
      password: 'asdfadsfadsfdsafasd',
    };

    const response = await request(app)
      .post('/api/v1/users/signin')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body.token).toBeUndefined();

    done();
  });
});
