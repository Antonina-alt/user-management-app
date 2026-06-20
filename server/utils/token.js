const jwt = require('jsonwebtoken');
const { jwtSecret, emailConfirmationSecret } = require('../config/env');
const ApiError = require('./ApiError');

const EMAIL_CONFIRMATION = 'email-confirmation';
const authMissingError = () => new ApiError(401, 'Not authorized. Token is missing.');
const authFailedError = () => new ApiError(401, 'Not authorized. Token failed.');
const confirmationError = () => new ApiError(400, 'Confirmation link is invalid or expired.');

const createToken = (id) => jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });

const decode = (token, secret, createError) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw createError();
  }
};

const verifyToken = (token) => {
  if (!token) throw authMissingError();
  return decode(token, jwtSecret, authFailedError);
};

const createEmailConfirmationToken = (id) => jwt.sign(
  { id, purpose: EMAIL_CONFIRMATION },
  emailConfirmationSecret,
  { expiresIn: '24h' }
);

const assertEmailPurpose = (decoded) => {
  if (decoded.purpose !== EMAIL_CONFIRMATION) throw confirmationError();
};

const verifyEmailConfirmationToken = (token) => {
  if (!token) throw new ApiError(400, 'Confirmation token is missing.');
  const decoded = decode(token, emailConfirmationSecret, confirmationError);
  assertEmailPurpose(decoded);
  return decoded;
};

module.exports = {
  createToken,
  verifyToken,
  createEmailConfirmationToken,
  verifyEmailConfirmationToken,
};
