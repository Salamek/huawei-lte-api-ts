#!/usr/bin/env node
/*
Example code on how to send a SMS, you can try it by running:
node send_sms.py http://admin:PASSWORD@192.168.8.1/ +420123456789 "Hello world"
*/
const process = require('process');
const lte = require('../dist/index.js');

const connection = new lte.Connection(process.argv[2]);

connection.ready.then(() => {
    console.log('Ready');
    const sms = new lte.Sms(connection);
    sms.sendSms([process.argv[3]], process.argv[4]).then((result) => {
        if (result == 'OK') {
            console.log('SMS was send successfully');
        } else {
            console.log('Error');
        }
    }).catch((error) => {
        console.log(error);
    });
});


