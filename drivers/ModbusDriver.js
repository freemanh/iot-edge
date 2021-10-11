const ModbusRTU = require("modbus-serial");

module.exports = function ModbusDriver(config) {
    this.config = config

    this.client = new ModbusRTU();

    // open connection to a tcp line
    this.client.connectTCP(this.driver.config.ip, { port: this.driver.config.port });

    this.read = function (device) {
        this.client.setID(device.config.slaveId);
        for (const prop of device.props) {
            switch (prop.extra.fc) {
                case 3: // read holding register
                    this.client.readHoldingRegisters(prop.address, prop.length, function (err, data) {
                        prop.value = data.data * prop.ratio
                        prop.updatedAt = new Date()
                    });
                    break;
                case 4: // read input register
                    this.client.readHoldingRegisters(prop.address, prop.length, function (err, data) {
                        prop.value = data.data * prop.ratio
                        prop.updatedAt = new Date()
                    });
                    break;

                default:
                    break;
            }
        }
    }
}