const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('convertHandler should correctly read a whole number input', function(done) {
      const input = '32L';
      const expected = 32;
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
    
    test('convertHandler should correctly read a decimal number input', function(done) {
      const input = '32.5L';
      const expected = 32.5;
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
    
    test('convertHandler should correctly read a fractional input', function(done) {
      const input = '1/2L';
      const expected = 0.5;
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
    
    test('convertHandler should correctly read a fractional input with a decimal', function(done) {
      const input = '3.5/2L';
      const expected = 1.75;
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
    
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function(done) {
      const input = '3/2/3L';
      const expected = 'invalid number';
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
    
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
      const input = 'L';
      const expected = 1;
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('convertHandler should correctly read each valid input unit', function(done) {
      const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
      validUnits.forEach(unit => {
        const input = `1${unit}`;
        const expected = unit === 'l' ? 'L' : unit;
        assert.equal(convertHandler.getUnit(input), expected);
      });
      done();
    });
    
    test('convertHandler should correctly return an error for an invalid input unit', function(done) {
      const input = '32g';
      const expected = 'invalid unit';
      assert.equal(convertHandler.getUnit(input), expected);
      done();
    });
    
    test('convertHandler should correctly return the correct return unit for each valid input unit', function(done) {
      const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
      validUnits.forEach(unit => {
        const expected = convertHandler.units[unit];
        assert.equal(convertHandler.getReturnUnit(unit), expected);
      });
      done();
    });
    
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
      const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
      validUnits.forEach(unit => {
        const expected = convertHandler.spellOutUnit[unit];
        assert.equal(convertHandler.spellOutUnit(unit), expected);
      });
      done();
    });
  });
  
  suite('Function convertHandler.convert(initNum, initUnit)', function() {
    
    test('convertHandler should correctly convert gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('convertHandler should correctly convert L to gal', function(done) {
      const input = [5, 'L'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('convertHandler should correctly convert mi to km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.04670;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('convertHandler should correctly convert km to mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('convertHandler should correctly convert lbs to kg', function(done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('convertHandler should correctly convert kg to lbs', function(done) {
      const input = [5, 'kg'];
      const expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });
});
