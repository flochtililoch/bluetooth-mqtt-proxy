#! /usr/local/bin/node --harmony

const bluetoothMQTTProxy = require('../');
const { processArgv } = require('../lib/cli');

const argsMap = {
  config: ['-c', '--config'],
};
const args = processArgv(argsMap);

bluetoothMQTTProxy(args);
