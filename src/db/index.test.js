const knex = require('knex');
const bcrypt = require('bcrypt');
const db = require('./');
const config = require('../../knexfile');
const user = {
  username: 'testuser',
  first_name: 'first',
  last_name: 'last',
  mi: 'm',
  suffix: 'Mr',
  email: 'email@example.com',
  password: 'password',
};

describe('DB Tests', () => {
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

  describe('User Exists', () => {
    beforeAll(done => {
      return client('users')
        .insert(user)
        .then(() => done())
        .catch(err => done(err));
    });

    afterAll(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should not have email that exists', done => {
      const email = 'test@example.com';
      return db.emailExists(email).then(res => {
        expect(res).toBe(false);
        done();
      });
    });

    it('should have email that exists', done => {
      const email = 'email@example.com';
      return db.emailExists(email).then(res => {
        expect(res).toBe(true);
        done();
      });
    });

    it('should not have username that exists', done => {
      const username = 'notuser';
      return db.usernameExists(username).then(res => {
        expect(res).toBe(false);
        done();
      });
    });

    it('should have username that exists', done => {
      const username = 'testuser';
      return db.usernameExists(username).then(res => {
        expect(res).toBe(true);
        done();
      });
    });

    it('should return object with username and email are true', done => {
      const email = 'email@example.com';
      const username = 'testuser';
      return db.doesExist(email, username).then(res => {
        expect(res.email).toBe(true);
        expect(res.username).toBe(true);
        done();
      });
    });

    it('should return object with username and email are false', done => {
      const email = 'not@example.com';
      const username = 'notuser';
      return db.doesExist(email, username).then(res => {
        expect(res.email).toBe(false);
        expect(res.username).toBe(false);
        done();
      });
    });

    it('should return object with username true and email false', done => {
      const email = 'not@example.com';
      const username = 'testuser';
      return db.doesExist(email, username).then(res => {
        expect(res.email).toBe(false);
        expect(res.username).toBe(true);
        done();
      });
    });

    it('should return object with username false and email true', done => {
      const email = 'email@example.com';
      const username = 'notuser';
      return db.doesExist(email, username).then(res => {
        expect(res.email).toBe(true);
        expect(res.username).toBe(false);
        done();
      });
    });
  });

  describe('User Create', () => {
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

    it('should have created a user', done => {
      return client('users')
        .where({ username: user.username })
        .then((res) => {
          expect(res[0].username).toBe(user.username);
          done();
        });
    });

    it('should not create a user when already exists', done => {
      return db.createUser(user).then(res => {
        expect(res.message).toBe('User already exists');
        done();
      });
    });

    it('should authenticate a user', done => {
      return db.authenticateUser(user).then(res => {
        expect(res.first_name).toBe(user.first_name);
        expect(res.last_name).toBe(user.last_name);
        expect(res.mi).toBe(user.mi);
        expect(res.suffix).toBe(user.suffix);
        expect(res.username).toBe(user.username);
        expect(res.email).toBe(user.email);
        done();
      });
    });

    it('should not authenticate a user with wrong password', done => {
      const params = {
        username: user.username,
        password: 'notpassword',
      };

      return db.authenticateUser(params).then(res => {
        expect(res).toBe(false);
        done();
      });
    });

    it('should not authenticate not a user', done => {
      const params = {
        username: 'not user',
        password: 'notpassword',
      };

      return db.authenticateUser(params).then(res => {
        expect(res).toBe(false);
        done();
      });
    });
  });

  describe('User Get', () => {
    beforeAll(done => {
      return client('users')
        .insert(user)
        .then(() => done())
        .catch(err => done(err));
    });

    afterAll(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should get a user by username', done => {
      return db.getByUsername(user.username).then(res => {
        expect(res.first_name).toBe(user.first_name);
        expect(res.last_name).toBe(user.last_name);
        expect(res.mi).toBe(user.mi);
        expect(res.suffix).toBe(user.suffix);
        expect(res.username).toBe(user.username);
        expect(res.email).toBe(user.email);
        done();
      });
    });

    it('should return an empty object when username does not exist', done => {
      return db.getByUsername('notuser').then(res => {
        expect(res).toEqual({});
        done();
      });
    });

    it('should get a user by id', done => {
      const id = 1;
      return db.getByUserId(id).then(res => {
        expect(res.first_name).toBe(user.first_name);
        expect(res.last_name).toBe(user.last_name);
        expect(res.mi).toBe(user.mi);
        expect(res.suffix).toBe(user.suffix);
        expect(res.username).toBe(user.username);
        expect(res.email).toBe(user.email);
        done();
      });
    });

    it('should return an empty object when user id does not exist', done => {
      return db.getByUserId(6).then(res => {
        expect(res).toEqual({});
        done();
      });
    });
  });

  describe('User Update', () => {
    beforeEach(done => {
      return client('users')
        .insert(user)
        .then(() => done())
        .catch(err => done(err));
    });

    afterEach(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should update user details by username', done => {
      const updated = {
        first_name: 'updated first',
        last_name: 'updated last',
      };

      return db
        .updateUserDetails(user.username, updated)
        .then(res => {
          return expect(res).toBe(true);
        })
        .then(() => {
          return client('users').where({ username: user.username });
        })
        .then(res => {
          expect(res[0].first_name).toBe(updated.first_name);
          expect(res[0].last_name).toBe(updated.last_name);
          done();
        });
    });

    it('should not update user details when not found', done => {
      const updated = {
        first_name: 'updated first',
        last_name: 'updated last',
      };

      return db.updateUserDetails('notuser', updated).then(res => {
        expect(res).toBe(false);
        done();
      });
    });

    it.skip('should update user password', done => {
      const updatedPassword = 'newpassword';

      return db
        .updateUserPassword(user.username, updatedPassword)
        .then(res => {
          expect(res).toBe(true);
          return client('users').where({ username: user.username });
        })
        .then(res => {
          return bcrypt.compare(updatedPassword, res[0].password);
        })
        .then(res => {
          expect(res).toBe(true);
          return done();
        });
    });

    it('should not update user password with wrong username', done => {
      const username = 'notuser';
      const updatedPassword = 'newpassword';

      return db.updateUserPassword(username, updatedPassword).then(res => {
        expect(res).toBe(false);
        done();
      });
    });
  });

  describe('User Delete', () => {
    beforeEach(done => {
      return client('users')
        .insert(user)
        .then(() => done())
        .catch(err => done(err));
    });

    afterEach(done => {
      return client('users')
        .truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should delete user by username', done => {
      return db.deleteByUsername(user.username).then(res => {
        expect(res).toBe(true);
        done();
      });
    });

    it('should not delete a user without username', done => {
      return db.deleteByUsername('notuser').then(res => {
        expect(res).toBe(false);
        done();
      });
    });
  });
});
