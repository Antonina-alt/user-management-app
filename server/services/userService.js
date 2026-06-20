const messages = require('../constants/userMessages');
const users = require('../repositories/userRepository');
const ApiError = require('../utils/ApiError');

const emptyMessages = {
  block: 'Selected users are already blocked or do not exist.',
  unblock: 'Selected users are not blocked or do not exist.',
  delete: 'Selected users do not exist.',
};

const createAction = (run, key, message, empty) => ({ run, key, message, empty });

const actions = {
  block: createAction(users.blockMany, 'updated', messages.block, emptyMessages.block),
  unblock: createAction(users.unblockMany, 'updated', messages.unblock, emptyMessages.unblock),
  delete: createAction(users.deleteMany, 'deleted', messages.delete, emptyMessages.delete),
};

const list = () => users.findAllPublic();
const touch = (userId) => (userId ? users.updateLastActivity(userId) : undefined);
const countPayload = (key, count, message) => ({ [key]: count, message: message(count) });

const assertChanged = (rows, message) => {
  if (!rows.length) throw new ApiError(400, message);
};

const mutateMany = async (ids, userId, action) => {
  await touch(userId);
  const rows = await action.run(ids);
  assertChanged(rows, action.empty);
  return countPayload(action.key, rows.length, action.message);
};

const deleteUnverified = async (userId) => {
  await touch(userId);
  const rows = await users.deleteUnverified();
  return countPayload('deleted', rows.length, messages.deleteUnverified);
};

module.exports = {
  list,
  block: (ids, userId) => mutateMany(ids, userId, actions.block),
  unblock: (ids, userId) => mutateMany(ids, userId, actions.unblock),
  delete: (ids, userId) => mutateMany(ids, userId, actions.delete),
  deleteUnverified,
};
