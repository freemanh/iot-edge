var assert = require('assert');
var ModbusDriver = require('../drivers/ModbusDriver')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Modbus Driver', function(){
    it('should read data', function(done){
        const driver = new ModbusDriver({})
        driver.read({})
    })
})