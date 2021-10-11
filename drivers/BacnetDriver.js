const bacnet = require('bacstack');

module.exports = function BacnetDriver(config) {
    this.config = config

    this.client = new bacnet({});
    
    this.read = function (device) {
        // Read Device Object
        const requestArray = device.props.map(item => {
            return {
                objectId: { type: item.extra.objectType, instance: item.extra.instanceId },
                properties: [{ id: bacnet.enum.PropertyIdentifier.PRESENT_VALUE }]
            }
        })

        this.client.readPropertyMultiple(this.config.ip, requestArray, (err, value) => {
            console.log('value: ', value);
        });
    }
}

