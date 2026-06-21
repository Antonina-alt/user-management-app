const ApiError = require('./ApiError');

const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 255;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isBlank = (value) => typeof value === 'string' && value.trim() === '';
const isMissing = (value) => value === undefined || value === null || isBlank(value);
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const normalizeIds = (ids) => ids.map(Number).filter(isPositiveInteger);

const requireFields = (data, fields) => {
  if (fields.some((field) => isMissing(data?.[field]))) {
    throw new ApiError(400, 'Please fill in all required fields.');
  }
};

const validateMaxLength = (value, maxLength, fieldName) => {
  if (value.length > maxLength) {
    throw new ApiError(400, `${fieldName} must be no longer than ${maxLength} characters.`);
  }
};

const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, 'Please enter a valid e-mail address. It must contain "@" and a domain, for example: name@example.com.');
  }
  validateMaxLength(email, EMAIL_MAX_LENGTH, 'E-mail');
};

const validateName = (name) => {
  validateMaxLength(name, NAME_MAX_LENGTH, 'Name');
};

const validatePassword = (password) => {
  if (password.length < 1) {
    throw new ApiError(400, 'Password must contain at least 1 character.');
  }
};

const validateRegisterData = ({ name, email, password }) => {
  validateName(name.trim());
  validateEmail(email.trim());
  validatePassword(password);
};

const validateLoginData = ({ email, password }) => {
  validateEmail(email.trim());
  validatePassword(password);
};

const assertIdsArray = (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) throw new ApiError(400, 'User ids are required.');
};

const assertHasValidIds = (ids) => {
  if (ids.length === 0) throw new ApiError(400, 'Valid user ids are required.');
};

const requireIds = (ids) => {
  assertIdsArray(ids);
  const normalizedIds = normalizeIds(ids);
  assertHasValidIds(normalizedIds);
  return [...new Set(normalizedIds)];
};

module.exports = {
  requireFields,
  requireIds,
  validateRegisterData,
  validateLoginData,
};