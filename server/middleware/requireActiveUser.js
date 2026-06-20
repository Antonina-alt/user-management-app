const { verifyToken } = require('../utils/token');
const authService = require('../services/authService');
const { clearCookieOptions } = require('../config/cookie');

const PUBLIC_ROUTES = new Set([
  'POST /auth/register',
  'POST /auth/login',
  'POST /auth/logout',
]);

const routeKey = ({ method, path }) => `${method} ${path}`;
const isConfirmationRoute = ({ method, path }) => method === 'GET' && path.startsWith('/auth/confirm-email/');
const isPublicRoute = (req) => PUBLIC_ROUTES.has(routeKey(req)) || isConfirmationRoute(req);

const authorize = async (req) => {
  const { id } = verifyToken(req.cookies?.token);
  req.user = await authService.getAuthorizedUser(id);
};

const reject = (res, next, error) => {
  res.clearCookie('token', clearCookieOptions);
  return next(error);
};

const resolveAuthorization = async (req, next) => {
  await authorize(req);
  return next();
};

const authorizeRequest = async (req, res, next) => {
  try {
    return await resolveAuthorization(req, next);
  } catch (error) {
    return reject(res, next, error);
  }
};

const requireActiveUser = (req, res, next) => {
  return isPublicRoute(req) ? next() : authorizeRequest(req, res, next);
};

module.exports = requireActiveUser;
