const { clientUrl } = require('./env');

module.exports = {
  origin: clientUrl,
  credentials: true,
};
