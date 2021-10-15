const ModbusRTU = require("modbus-serial");

module.exports = function ModbusDriver(config) {
    this.config = config

    this.client = new ModbusRTU();

    // open connection to a tcp line
    this.client.connectTCP(this.driver.config.ip, { port: this.driver.config.port });

    this.read = function (device, callback) {
        this.client.setID(device.config.slaveId);
        let cnt = device.props.length
        for (const prop of device.props) {
            switch (prop.extra.fc) {
                case 3: // read holding register
                    this.client.readHoldingRegisters(prop.address, prop.length, (err, data) => {
                        updateData(data, prop, device)
                        shouldCallback(cnt, device, callback)
                    });
                    break;
                case 4: // read input register
                    this.client.readHoldingRegisters(prop.address, prop.length, (err, data) => {
                        updateData(data, prop, device)
                        shouldCallback(cnt, device, callback)
                    });
                    break;
                default:
                    break;
            }
        }
    }
}

function updateData(data, prop, device) {
    prop.value = data.data * prop.ratio
    prop.updatedAt = new Date()
}

function shouldCallback(cnt, device, callback){
    cnt -= 1
    if(cnt === 0){
        callback(null, device)
    }
}