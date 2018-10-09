const middleware = require('./src/middleware')

describe('Server Tests', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });

  describe('middleware tests', () => {
    it('should create a user', () => {
      middleware.createUser({}, { send: (str) => expect(str).toBe('Create User')})
    });

    it('should get a user', () => {
      const req = { params: { id: 1}}
      const res = { send: (str) => expect(str).toBe(req.params.id) }
      middleware.getUser(req, res)
    });

    it('should delete a user', () => {
      const req = { params: { id: 1}}
      const res = { send: (str) => expect(str).toBe(req.params.id) }
      middleware.deleteUser(req, res)
    });

    it('should update a user', () => {
      const req = { params: { id: 1}}
      const res = { send: (str) => expect(str).toBe(req.params.id) }
      middleware.updateUser(req, res)
    });
  });
});
