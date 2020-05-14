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

describe('GET /api/v1/posts', () => {
  it('should return posts', async (done) => {
    const response = await request(app)
      .get('/api/v1/posts')
      .expect('Content-Type', /json/)
      .expect(200);

    done();
  });
});

let post = {
  imageUrl:
    'https://www.thegreatestmagazine.com/wp-content/uploads/2018/10/distribuzione.jpg',
  caption: 'Greatest',
  userId: '5ebd19b1064e27211c643656',
  id: '',
};

describe('POST /api/v1/posts/create', () => {
  it('should return created post', async (done) => {
    const response = await request(app)
      .post('/api/v1/posts/create')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.createdPost.image_url).toEqual(post.imageUrl);

    post.id = response.body.createdPost.id;

    done();
  });

  it('should return error for invalid user', async (done) => {
    const response = await request(app)
      .post('/api/v1/posts/create')
      .send({
        ...post,
        userId: 'nosuchuser',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});

describe('GET /api/v1/posts/:postId', () => {
  it('should return a single post object', async (done) => {
    const response = await request(app)
      .get(`/api/v1/posts/${post.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.id).toEqual(post.id);

    done();
  });

  it('should return not existing post error', async (done) => {
    const response = await request(app)
      .get(`/api/v1/posts/nosuchpost`)
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});

describe('PUT /api/v1/posts/:postId/update', () => {
  it('should return updated post', async (done) => {
    const response = await request(app)
      .put(`/api/v1/posts/${post.id}/update`)
      .send({ caption: 'Updated!' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.post.id).toEqual(post.id);
    expect(response.body.post.caption).toEqual('Updated!');

    done();
  });

  it('should return not existing post error', async () => {
    const response = await request(app)
      .put(`/api/v1/posts/nosuchpost/update`)
      .send({ caption: 'Updated!' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should return not existing caption error', async () => {
    const response = await request(app)
      .put(`/api/v1/posts/${post.id}/update`)
      .expect('Content-Type', /json/)
      .expect(422);
  });
});

describe('GET /api/v1/posts/:postId/delete', () => {
  it('should return deleted post', async (done) => {
    const response = await request(app)
      .delete(`/api/v1/posts/${post.id}/delete`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.post.id).toEqual(post.id);

    done();
  });

  it('should return not existing post error', async (done) => {
    const response = await request(app)
      .delete(`/api/v1/posts/nosuchpost/delete`)
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});
