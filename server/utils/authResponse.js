const { cookieOptions, clearCookieOptions } = require('../config/cookie');
const { createToken } = require('./token');

const setAuthCookie = (res, userId) => res.cookie('token', createToken(userId), cookieOptions);

const sendAuthUser = (res, statusCode, user, extra = {}) => {
  setAuthCookie(res, user.id);
  return res.status(statusCode).json({ user, ...extra });
};

const sendLogout = (res) => {
  res.clearCookie('token', clearCookieOptions);
  return res.json({ message: 'Logged out successfully.' });
};

module.exports = {
  sendAuthUser,
  sendLogout,
};
