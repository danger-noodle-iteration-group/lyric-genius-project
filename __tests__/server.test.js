// const assert = require('assert').strict;
// const app = require('../server/server.js');
const request = require('supertest'); // (app);

const server = 'localhost:5001';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        request(server)
          .get('/')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});  