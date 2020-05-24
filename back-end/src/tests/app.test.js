const mongoose = require('mongoose');
const request = require('supertest');
const dbSetup = require('../db');
const project = require('../constants/project');
const app = require('../app');

beforeAll(() => {
  dbSetup();
});

afterAll((done) => {
  mongoose.disconnect();
  return done();
});

describe('GET /', () => {
  it('should respond with a message', async (done) => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(project.message);

    done();
  });
});
