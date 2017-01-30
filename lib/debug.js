const debug = require('debug');
const { name } = require('../package');

module.exports = file => debug(`${name}#${file}`);
