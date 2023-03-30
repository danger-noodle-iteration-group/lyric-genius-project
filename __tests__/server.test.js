const request = require('supertest');

const server = 'localhost:5001';

describe('Route integration', () => {
  describe('/', () => {
    it('responds with 200 status and text/html content type', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });
  describe('/api/getsongs/:page', () => {
    it('responds with 200 status and application/json content type', () => {
      return request(server)
        .get('/api/getsongs/1')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
    it('responds with at least one valid song object', () => {
      return request(server)
        .get('/api/getsongs/1')
        .then((res) => {
          expect(res.body[0]).toEqual(expect.any(Object));
          expect(res.body[0].artist_name).toEqual(expect.any(String));
          expect(res.body[0].track_id).toEqual(expect.any(Number));
          expect(res.body[0].track_name).toEqual(expect.any(String));
        });
    });
  });
  describe('/api/getlyrics/:id', () => {
    it('responds with 200 status and application/json content type', () => {
      return request(server)
        .get('/api/getlyrics/115537847')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
    it('responds with valid lyrics', () => {
      return request(server)
        .get('/api/getlyrics/115537847')
        .then((res) => {
          expect(res.body).toEqual(expect.any(String));
        });
    });
  });
  describe('/users/createusers', () => {
    it('responds with 200 status and application/json content type', () => {
      return request(server)
        .post('/users/createusers')
        .send({
          name: 'name',
          email: 'email',
          password: 'password',
        })
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });
  describe('/users/login', () => {
    it('responds with 200 status and application/json content type', () => {
      return request(server)
        .post('/users/login')
        .send({
          email: 'email',
          password: 'password',
        })
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
    it('responds with id and verified', () => {
      return request(server)
        .post('/users/login')
        .send({
          email: 'email',
          password: 'password',
        })
        .then((res) => {
          expect(res.body.id).toEqual(expect.any(String));
          expect(res.body.verified).toEqual(expect.any(Boolean));
        });
    });
  });
});
