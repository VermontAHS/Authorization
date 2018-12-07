const request = require('supertest');
const knex = require('knex');
const server = require('./server');
const db = require('./db');
const config = require('../knexfile');
const user = {
  username: 'testuser',
  first_name: 'first',
  last_name: 'last',
  mi: 'm',
  suffix: 'Mr',
  email: 'email@example.com',
  password: 'password',
};

const createSession = (agent, userinfo) => {
  return agent
    .post('/api/login')
    .send({
      username: userinfo.username,
      password: userinfo.password,
    })
    .expect(200)
    .then(res => {
      const cookie = res.headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0]);

      agent.jar.setCookies(cookie);
    });
};

describe('API Routes', () => {
  const client = knex(config.test);

  beforeAll(done => {
    return client.migrate
      .latest()
      .then(() => done())
      .catch(err => done(err));
  });

  afterAll(done => {
    return client('users')
      .truncate()
      .then(() => done())
      .catch(err => done(err));
  });

  describe('Login', () => {
    beforeAll(done => {
      return db
        .createUser(user)
        .then(() => done())
        .catch(err => done(err));
    });

    afterAll(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should login a user', done => {
      const agent = request(server);

      agent
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({ username: user.username, password: user.password })
        .expect(200)
        .then(res => {
          expect(res.body.username).toBe(user.username);
          expect(res.body.email).toBe(user.email);
          done();
        });
    });

    it('should not login a non user', done => {
      const agent = request(server);
      const username = 'not a user';
      const password = 'notpassword';

      agent
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({ username: username, password: password })
        .expect(401)
        .then(() => done());
    });
  });

  describe('Log out', () => {
    const agent = request(server);
    const unauthenticated = request(server);

    beforeAll(done => {
      return db
        .createUser(user)
        .then(() => {
          return agent
            .post('/api/login')
            .set('Accept', 'application/json')
            .send({ username: user.username, password: user.password });
        })
        .then(() => done())
        .catch(err => done(err));
    });

    afterAll(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should log out a user', done => {
      agent
        .get('/api/logout')
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          expect(res.body.message).toBe('Log out successful');
          done();
        });
    });

    it('should not logout a non authenticated', done => {
      unauthenticated
        .post('/api/logout')
        .set('Accept', 'application/json')
        .expect(404)
        .then(() => done());
    });
  });

  describe('Authenticated get profile', () => {
    let agent = request.agent(server);
    let unauthenticated = request.agent(server);

    beforeAll(done => {
      return db
        .createUser(user)
        .then(() => createSession(agent, user))
        .then(() => done())
        .catch(err => done(err));
    });

    afterAll(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should get user info', done => {
      agent
        .get('/api/profile')
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.body.username).toBe(user.username);
          expect(res.body.email).toBe(user.email);
          expect(res.body.last_name).toBe(user.last_name);
          expect(res.body.mi).toBe(user.mi);
          expect(res.body.suffix).toBe(user.suffix);
          done();
        });
    });

    it('should not logout a non authenticated', done => {
      unauthenticated
        .get('/api/profile')
        .set('Accept', 'application/json')
        .expect(401)
        .then(res => {
          expect(res.body.message).toBe('Must log in for access');
          done();
        });
    });
  });
});
