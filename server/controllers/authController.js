const authService = require('../services/authService');
const { sendAuthUser, sendLogout } = require('../utils/authResponse');
const { clientUrl } = require('../config/env');
const authMessages = require('../constants/authMessages');

const confirmationStatus = (confirmed) => (confirmed ? '1' : '0');

const confirmationParams = (confirmed, message) => {
  const params = new URLSearchParams({ emailConfirmed: confirmationStatus(confirmed) });
  if (message) params.set('message', message);
  return params;
};

const confirmationUrl = (confirmed, message) => {
  return `${clientUrl}/?${confirmationParams(confirmed, message).toString()}`;
};

const confirmErrorMessage = (error) => {
  return error.statusCode ? error.message : authMessages.confirmationFailed;
};

const register = async (req, res) => {
  const { user, message } = await authService.register(req.body);
  return sendAuthUser(res, 201, user, { message });
};

const login = async (req, res) => sendAuthUser(res, 200, await authService.login(req.body));
const getCurrentUser = async (req, res) => res.json(req.user);
const logout = async (req, res) => sendLogout(res);

const redirectConfirmedEmail = async (res, token) => {
  await authService.confirmEmail(token);
  return res.redirect(confirmationUrl(true));
};

const redirectConfirmationError = (res, error) => {
  return res.redirect(confirmationUrl(false, confirmErrorMessage(error)));
};

const confirmEmail = async (req, res) => {
  try {
    return await redirectConfirmedEmail(res, req.params.token);
  } catch (error) {
    return redirectConfirmationError(res, error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  confirmEmail,
  logout,
};
