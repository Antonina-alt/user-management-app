const ApiError = require('./ApiError');

const isBlank = (value) => typeof value === 'string' && value.trim() === '';
const isMissing = (value) => value === undefined || value === null || isBlank(value);
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const normalizeIds = (ids) => ids.map(Number).filter(isPositiveInteger);

const requireFields = (data, fields) => {
  if (fields.some((field) => isMissing(data?.[field]))) {
    throw new ApiError(400, 'Please fill in all required fields.');
  }
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

module.exports = { requireFields, requireIds };
