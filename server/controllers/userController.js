const userService = require('../services/userService');
const { requireIds } = require('../utils/validators');
const sendJson = require('../utils/sendJson');

const userId = (req) => req.user?.id;
const ids = (req) => requireIds(req.body?.ids);

const getUsers = async (req, res) => sendJson(res, await userService.list());
const blockUsers = async (req, res) => sendJson(res, await userService.block(ids(req), userId(req)));
const unblockUsers = async (req, res) => sendJson(res, await userService.unblock(ids(req), userId(req)));
const deleteUsers = async (req, res) => sendJson(res, await userService.delete(ids(req), userId(req)));
const deleteUnverifiedUsers = async (req, res) => sendJson(res, await userService.deleteUnverified(userId(req)));

module.exports = {
  getUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
  deleteUnverifiedUsers,
};
