const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { requireFields, validateRegisterData, validateLoginData } = require('../utils/validators');
const { sendConfirmationEmail } = require('./emailService');
const { verifyEmailConfirmationToken } = require('../utils/token');
const authMessages = require('../constants/authMessages');
const users = require('../repositories/userRepository');

const REGISTER_FIELDS = ['name', 'email', 'password'];
const LOGIN_FIELDS = ['email', 'password'];

const toPublicUser = ({ id, name, email, status, display_status }) => ({
  id,
  name,
  email,
  status: display_status || status,
});

const logEmailError = (error) => {
  console.error('Failed to send confirmation e-mail:', {
    message: error.message,
    code: error.code,
    statusCode: error.response?.statusCode,
    errors: error.response?.body?.errors,
  });
};
const sendConfirmation = (user) => sendConfirmationEmail(user).catch(logEmailError);

const register = async (data) => {
  requireFields(data, REGISTER_FIELDS);
  validateRegisterData(data);
  const user = await createUser(data);
  sendConfirmation(user);
  return { user: toPublicUser(user), message: authMessages.registered };
};

const confirmEmail = async (token) => {
  const user = await users.confirmEmail(verifyEmailConfirmationToken(token).id);
  if (!user) throw new ApiError(400, authMessages.invalidConfirmation);
  return toPublicUser(user);
};

const login = async (data) => {
  requireFields(data, LOGIN_FIELDS);
  validateLoginData(data);
  const user = await getLoginUser(data);
  return toPublicUser(await users.updateLastLogin(user.id));
};

const getAuthorizedUser = async (id) => {
  const user = assertAuthorizedUser(await users.findById(id));
  return toPublicUser(user);
};

const createUser = async ({ name, email, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return users.create({ name: name.trim(), email: email.trim(), passwordHash }).catch(handleCreateUserError);
};

const getLoginUser = async ({ email, password }) => {
  const user = await findLoginUser(email);
  await ensurePasswordIsValid(password, user.password_hash);
  return ensureUserIsNotBlocked(user);
};

const assertAuthorizedUser = (user) => {
  ensureUserExists(user);
  return ensureUserIsNotBlocked(user);
};

const handleCreateUserError = (error) => {
  if (error.code === '23505') throw new ApiError(400, authMessages.emailAlreadyRegistered);
  throw error;
};

const findLoginUser = async (email) => {
  const user = await users.findByEmail(email);
  if (!user) throw new ApiError(400, authMessages.invalidCredentials);
  return user;
};

const ensurePasswordIsValid = async (password, hash) => {
  if (!(await bcrypt.compare(password, hash))) throw new ApiError(400, authMessages.invalidCredentials);
};

const ensureUserExists = (user) => {
  if (!user) throw new ApiError(401, authMessages.deleted);
};

const ensureUserIsNotBlocked = (user) => {
  if (user.is_blocked) throw new ApiError(403, authMessages.blocked);
  return user;
};

module.exports = { register, login, getAuthorizedUser, confirmEmail };
