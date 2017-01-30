const mqtt = require('mqtt');
const bleno = require('bleno');
const debug = require('./debug')('service');

module.exports = (config) => {
  const client = mqtt.connect(config.host);

  client.on('connect', () => {
    debug(`mqtt client connected to ${config.host}`);

    const characteristics = config.characteristics.map((characteristic) => {
      const { uuid, topic } = characteristic;
      const properties = ['read', 'write'];
      const onReadRequest = (offset, callback) => {
        callback(bleno.Characteristic.RESULT_SUCCESS, new Buffer([0]));
      };
      const onWriteRequest = (data, offset, withoutResponse, callback) => {
        const publish = data.toString();
        debug(`publishing ${publish} to ${topic}`);
        client.publish(topic, publish);
        callback(bleno.Characteristic.RESULT_SUCCESS);
      };

      return new bleno.Characteristic({ uuid, properties, onReadRequest, onWriteRequest });
    });

    const { uuid, name } = config;
    const service = new bleno.PrimaryService({ uuid, characteristics });
    bleno.startAdvertising(name, [uuid], (error) => {
      if (!error) {
        bleno.setServices([service]);
      } else {
        debug('error', error);
      }
    });
  });
};
