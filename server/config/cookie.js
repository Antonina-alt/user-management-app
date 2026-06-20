const { nodeEnv } = require('./env');

const cookieOptions = {
  httpOnly: true,
  secure: nodeEnv === 'production',
  sameSite: nodeEnv === 'production' ? 'None' : 'Strict',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
  ...cookieOptions,
  maxAge: 1,
};

module.exports = { cookieOptions, clearCookieOptions };
