const DriverModel = require('./models/Driver')
const DeviceModel = require('./models/Device')
const { DriverType } = require('./enums')

const BacnetDriver = require('./drivers/BacnetDriver')
const ModbusDriver = require('./drivers/ModbusDriver')

async function exec() {
    console.log('to read...')

    const drivers = await DriverModel.find()
    for (const driver of drivers) {
        let driverImpl
        switch(driver.type){
            case DriverType.BACNET:
                driverImpl = new BacnetDriver(driver.config)
                break
            case DriverType.MODBUS:
                driverImpl = new ModbusDriver(driver.config)
                break
            default:
                break
            
        }

        const devices = await DeviceModel.find({ driverId: driver.id })

        for(const device of devices){
            driverImpl.read(device)
        }
    }
}

exec()


