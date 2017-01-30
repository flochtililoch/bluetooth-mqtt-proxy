# Bluetooth MQTT Proxy

Runs a bluetooth LE service that forwards messages to a MQTT service.

## Setup

```sh
$ npm install bluetooth-mqtt-proxy -g
```

## Config

```json
{
  "name": "BLE2MQTT",
  "uuid": "70B3FB84-748F-4BA1-A162-28F19F068CD2",
  "host": "mqtt://localhost",
  "characteristics": [
    {
      "uuid": "3DC74FD3-73C4-4252-89CA-ACF5197636DC",
      "topic": "presence"
    },
    {
      "uuid": "3D54BCE8-FAC4-447D-8100-70C15F4D7219",
      "topic": "foo"
    }
  ]
}
```

## Running

```sh
$ bluetooth-mqtt-proxy -c=/path/to/config.json
```

## Debug

```sh
DEBUG=bluetooth-mqtt-proxy* bluetooth-mqtt-proxy -c=/path/to/config.json
```

## Puck.js client

[Puck.js](http://www.puck-js.com/) is a JavaScript microcontroller you can program wirelessly.
Here's a basic client implementation:

```javascript
const blink = (led) => {
  const duration = 300;
  setTimeout(() => {
    led.write(true);
    setTimeout(() => {
      led.write(false);
    }, duration);
  }, duration);
};

// As specified in config.json
const name = 'BLE2MQTT';
const serviceUUID = '70b3fb84-748f-4ba1-a162-28f19f068cd2';
const topicUUID = '3DC74FD3-73C4-4252-89CA-ACF5197636DC';

// When button is clicked
setWatch(() => {

  // Look for bluetooth-mqtt-proxy service
  NRF
    .requestDevice({ timeout: 5000, filters: [{ namePrefix: name }] })
    .then((device) => {

      // Blink green to indicate service was found
      blink(LED2);

      // Connect to service
      device.gatt
        .connect()
        .then(gatt => gatt.getPrimaryService(serviceUUID))
        .then(service => service.getCharacteristic(topicUUID))
        .then((characteristic) => {

          // Send message to service, then blink blue
          characteristic.writeValue("Hello world!");
          blink(LED3);
          device.gatt.disconnect();
        });
    })
    .catch((error) => {

      // Error, blink red
      console.log(error);
      blink(LED1);
    });
}, BTN, { edge: 'rising', debounce: 50, repeat: true });
```
