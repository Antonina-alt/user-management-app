const users = require('../controllers/userController');
const createRouter = require('../utils/createRouter');

module.exports = createRouter([
  { method: 'get', path: '/', handler: users.getUsers },
  { method: 'patch', path: '/block', handler: users.blockUsers },
  { method: 'patch', path: '/unblock', handler: users.unblockUsers },
  { method: 'delete', path: '/unverified', handler: users.deleteUnverifiedUsers },
  { method: 'delete', path: '/', handler: users.deleteUsers },
]);
