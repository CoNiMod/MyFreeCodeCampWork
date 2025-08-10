/**
 * ConvertHandler Class
 * Handles conversion between metric and imperial units
 */
class ConvertHandler {
  constructor() {
    this.units = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    
    this.spellOutUnit = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    
    this.conversionRates = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    };
  }

  /**
   * Get the number from the input string
   * @param {string} input - The input string (e.g., "10L", "1/2kg", "3.5mi")
   * @returns {number|string} - The number or "invalid number"
   */
  getNum(input) {
    if (!input) return 1;
    
    // Find the first letter (unit start)
    const unitIndex = input.search(/[a-zA-Z]/);
    if (unitIndex === -1) return "invalid number";
    
    const numStr = input.substring(0, unitIndex);
    if (!numStr) return 1;
    
    // Check for double fractions (e.g., 3/2/3)
    const fractionCount = (numStr.match(/\//g) || []).length;
    if (fractionCount > 1) return "invalid number";
    
    try {
      // Handle fractions
      if (numStr.includes('/')) {
        const parts = numStr.split('/');
        if (parts.length !== 2) return "invalid number";
        
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
          return "invalid number";
        }
        
        return numerator / denominator;
      }
      
      // Handle decimal numbers
      const num = parseFloat(numStr);
      if (isNaN(num)) return "invalid number";
      
      return num;
    } catch (error) {
      return "invalid number";
    }
  }

  /**
   * Get the unit from the input string
   * @param {string} input - The input string (e.g., "10L", "1/2kg", "3.5mi")
   * @returns {string} - The unit or "invalid unit"
   */
  getUnit(input) {
    if (!input) return "invalid unit";
    
    // Find the first letter (unit start)
    const unitIndex = input.search(/[a-zA-Z]/);
    if (unitIndex === -1) return "invalid unit";
    
    const unit = input.substring(unitIndex).toLowerCase();
    
    // Handle special case for liters (should be uppercase)
    if (unit === 'l') return 'L';
    
    // Check if unit is valid
    if (this.units.hasOwnProperty(unit)) {
      return unit;
    }
    
    return "invalid unit";
  }

  /**
   * Get the return unit for the given input unit
   * @param {string} initUnit - The input unit
   * @returns {string} - The return unit or "invalid unit"
   */
  getReturnUnit(initUnit) {
    if (this.units.hasOwnProperty(initUnit)) {
      return this.units[initUnit];
    }
    return "invalid unit";
  }

  /**
   * Get the spelled out string for the unit
   * @param {string} unit - The unit abbreviation
   * @returns {string} - The spelled out unit or "invalid unit"
   */
  spellOutUnit(unit) {
    if (this.spellOutUnit.hasOwnProperty(unit)) {
      return this.spellOutUnit[unit];
    }
    return "invalid unit";
  }

  /**
   * Convert the number from the input unit to the return unit
   * @param {number} initNum - The input number
   * @param {string} initUnit - The input unit
   * @returns {number} - The converted number
   */
  convert(initNum, initUnit) {
    if (typeof initNum !== 'number' || !this.conversionRates.hasOwnProperty(initUnit)) {
      return "invalid number and unit";
    }
    
    return parseFloat((initNum * this.conversionRates[initUnit]).toFixed(5));
  }

  /**
   * Get the full conversion string
   * @param {string} input - The input string
   * @returns {object} - The conversion result object
   */
  getString(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return { error: "invalid number and unit" };
    }
    
    if (initNum === "invalid number") {
      return { error: "invalid number" };
    }
    
    if (initUnit === "invalid unit") {
      return { error: "invalid unit" };
    }
    
    const returnUnit = this.getReturnUnit(initUnit);
    const returnNum = this.convert(initNum, initUnit);
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    
    const string = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    };
  }
}

module.exports = ConvertHandler;
