const auth = require('../controllers/authController');
const createRouter = require('../utils/createRouter');

module.exports = createRouter([
  { method: 'post', path: '/register', handler: auth.register },
  { method: 'post', path: '/login', handler: auth.login },
  { method: 'get', path: '/confirm-email/:token', handler: auth.confirmEmail },
  { method: 'get', path: '/manager_table', handler: auth.getCurrentUser },
  { method: 'post', path: '/logout', handler: auth.logout },
]);
