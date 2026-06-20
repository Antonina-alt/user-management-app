const express = require('express');
const asyncHandler = require('./asyncHandler');

const addRoute = (router, { method, path, handler }) => {
  router[method](path, asyncHandler(handler));
};

const createRouter = (routes) => {
  const router = express.Router();
  routes.forEach((route) => addRoute(router, route));
  return router;
};

module.exports = createRouter;
