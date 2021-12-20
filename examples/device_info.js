#!/usr/bin/env node
/*
Example code on how to receive basic info about your router, you can try it by running:
node device_info.js http://admin:PASSWORD@192.168.8.1/
*/
const process = require('process');
const lte = require('../dist/index.js');

const connection = new lte.Connection(process.argv[2]);

connection.ready.then(() => {
    console.log('Ready');
    const device = new lte.Device(connection);
    device.information().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});
