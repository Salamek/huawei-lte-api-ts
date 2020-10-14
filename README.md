# huawei-lte-api-ts
API For huawei LAN/WAN LTE Modems rewritten from [original Python library](https://github.com/Salamek/huawei-lte-api) into TypeScript
you can use this to simply send SMS, get information about your internet usage, signal, and tons of other stuff

### Tested on:
#### 3G/LTE Routers:
* Huawei B310s-22
* Huawei B315s-22
* Huawei B525s-23a
* Huawei B525s-65a
* Huawei B715s-23c
* Huawei E5186s-22a
* Huawei B528s

#### 3G/LTE USB sticks:
(Device must support NETWork mode aka. "HiLink" version, it wont work with serial mode)
* Huawei E3131
* Huawei E3531


(probably will work for other Huawei LTE devices too)

### Will NOT work on:
#### LTE Routers:
* Huawei B2368-22 (Incompatible firmware, testing device needed!)

## Installation

### npm
```bash
$ npm i huawei-lte-api --save
```

## Usage

```typescript
import { Connection, Device } from 'huawei-lte-api';

const connection = Connection('http://admin:MY_SUPER_TRUPER_PASSWORD@192.168.8.1/')

//Can be accessed without authorization
device.signal().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

//Needs valid authorization, will throw exception if invalid credentials are passed in URL
device.information().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

# For more API calls just look on code in the src/api folder, there is no separate DOC yet

```
Result object
```javascript
{'DeviceName': 'B310s-22', 'SerialNumber': 'MY_SERIAL_NUMBER', 'Imei': 'MY_IMEI', 'Imsi': 'MY_IMSI', 'Iccid': 'MY_ICCID', 'Msisdn': None, 'HardwareVersion': 'WL1B310FM03', 'SoftwareVersion': '21.311.06.03.55', 'WebUIVersion': '17.100.09.00.03', 'MacAddress1': 'EHM:MY:MAC', 'MacAddress2': None, 'ProductFamily': 'LTE', 'Classify': 'cpe', 'supportmode': None, 'workmode': 'LTE'}
```

```javascript
const huaweiLteApi = require('huawei-lte-api');

const connection = new huaweiLteApi.Connection('http://admin:password@192.168.8.1/');

connection.ready.then(() => {
    console.log('Ready');


    const device = new huaweiLteApi.Device(connection);
    device.signal().then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.log(error);
    });


    device.information().then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.log(error);
    });

    const dialUp = new huaweiLteApi.DialUp(connection);
    dialUp.setMobileDataswitch(1).then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.log(error);
    });
});
```
