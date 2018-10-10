const middleware = require('./src/middleware')
const user = {
  username: 'testuser',
  first_name: 'first',
  last_name: 'last',
  mi: 'm',
  suffix: 'Mr',
  email: 'email@example.com',
  password: 'password'
}


describe('Server Tests', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });

  describe('middleware tests', () => {
    it('should create a user', () => {
      return middleware.createUser({ body: user }, {
        send: (id) => {
          return expect(typeof id).toBe('number')
        }
      })
    });

    it('should get a user', () => {
      return middleware.createUser({ body: user }, {
        send: id => {
          const req = { params: { id: id}}
          const res = {
            send: (str) => {
              const expected = {
                id: id,
                username: 'testuser',
                first_name: 'first',
                last_name: 'last',
                mi: 'm',
                suffix: 'Mr',
                email: 'email@example.com',
                password: 'password'
              }

              return expect(str).toMatchObject(expected)
            }
          }
          return middleware.getUser(req, res)
        }
      })
    });

    it('should delete a user', () => {
      return middleware.createUser({ body: user }, {
        send: id => {
          const req = { params: { id: id}}
          const res = {
            send: (str) => {
              return expect(str).toBe(0)
            }
          }
          return middleware.deleteUser(req, res)
        }
      })
    });

    it('should update a user', () => {
      return middleware.createUser({ body: user }, {
        send: id => {
          const req = {
            body: {
              email: 'updated@example.com'
            },
            params: {
              id: id
            }
          }
          const res = {
            send: (str) => {
              const expected = {
                id: id,
                username: 'testuser',
                first_name: 'first',
                last_name: 'last',
                mi: 'm',
                suffix: 'Mr',
                email: 'updated@example.com',
                password: 'password'
              }

              expect(str).toBe(true)

              return middleware.getUser(req, {
                send: result => {
                  return expect(result).toMatchObject(expected)
                }
              })
            }
          }
          return middleware.updateUser(req, res)
        }
      })
    });
  });
});
