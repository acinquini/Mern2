const auth = require('../middleware/authenticator/auth');

describe('auth', () => {
  it('should exist', () => {
    expect(auth).toBeDefined();
  });
  it('should be a function', () => {
    expect(typeof auth).toBe('function');
  });
});
