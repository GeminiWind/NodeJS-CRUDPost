var request = require('supertest');
const app = require('../server.js');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /register', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/register')
      .expect(200, done);
  });
});

describe('GET /forget', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/forget')
      .expect(200, done);
  });
});



