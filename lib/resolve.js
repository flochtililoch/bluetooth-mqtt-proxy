const { resolve, join } = require('path');

const resolvePath = path => join(path[0] === '~' ? join(process.env.HOME, path.slice(1)) : resolve(path));

module.exports = { resolvePath };
