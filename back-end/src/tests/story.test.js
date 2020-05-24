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

let story = {
  sourceUrl:
    'https://www.thegreatestmagazine.com/wp-content/uploads/2018/10/distribuzione.jpg',
  userId: '5ebd19b1064e27211c643656',
  id: '',
};

describe('POST /api/v1/stories/create', () => {
  it('should return created story', async (done) => {
    const response = await request(app)
      .post('/api/v1/stories/create')
      .send(story)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.createdStory.source_url).toEqual(story.sourceUrl);

    story.id = response.body.createdStory.id;

    done();
  });

  it('should return error for invalid user', async (done) => {
    const response = await request(app)
      .post('/api/v1/stories/create')
      .send({
        ...story,
        userId: 'nosuchuser',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});

describe('GET /api/v1/stories/:storyId', () => {
  it('should return a single story object', async (done) => {
    const response = await request(app)
      .get(`/api/v1/stories/${story.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.id).toEqual(story.id);

    done();
  });

  it('should return not existing story error', async (done) => {
    const response = await request(app)
      .get(`/api/v1/stories/nosuchstory`)
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});

describe('GET /api/v1/stories/:storyId/delete', () => {
  it('should return deleted story', async (done) => {
    const response = await request(app)
      .delete(`/api/v1/stories/${story.id}/delete`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.story.id).toEqual(story.id);

    done();
  });

  it('should return not existing story error', async (done) => {
    const response = await request(app)
      .delete(`/api/v1/stories/nosuchstory/delete`)
      .expect('Content-Type', /json/)
      .expect(422);

    done();
  });
});
