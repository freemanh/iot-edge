const DriverModel = require('./models/Driver')
const DeviceModel = require('./models/Device')
const { DriverType } = require('./enums')
const bacnet = require('bacstack');

async function exec() {
    console.log('to read...')

    const drivers = await DriverModel.find()
    for (const driver of drivers) {
        const client = new bacnet({});

        const devices = await DeviceModel.find({ driverId: driver.id })
        for (const device of devices) {
            const reader = new DeviceReader(driver)

            setInterval(() => {
                reader.read(device)
            }, 10000);

        }
    }
}

function DeviceReader(driver) {
    this.driver = driver
    this.read = function (device) {
        switch (driver.type) {
            case DriverType.BACNET:
                return readBacnet(device)
            case DriverType.MODBUS:
                return readModbus(device)
            default:
                break;
        }
    }

    var readBacnet = function (device) {
        // Read Device Object
        const requestArray = device.props.map(item => {
            return {
                objectId: { type: item.extra.objectType, instance: item.extra.instanceId },
                properties: [{ id: bacnet.enum.PropertyIdentifier.PRESENT_VALUE }]
            }
        })

        client.readPropertyMultiple(this.driver.config.ip, requestArray, (err, value) => {
            console.log('value: ', value);
        });

    }

    var readModbus = function (device) {

    }
}

exec()


