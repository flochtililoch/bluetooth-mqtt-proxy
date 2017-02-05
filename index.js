const bleno = require('bleno');
const peripheral = require('./lib');
const { resolvePath } = require('./lib/resolve');
const debug = require('./lib/debug')('main');

module.exports = (args) => {
  const config = Object.assign({}, require(resolvePath(args.config)), args);
  bleno.on('accept', () => debug('Accepted'));
  bleno.on('disconnect', () => debug('Disconnected'));
  bleno.on('stateChange', (state) => {
    debug('state change');
    if (state === 'poweredOn') {
      debug('powered on');
      peripheral(config);
    }
  });
};
