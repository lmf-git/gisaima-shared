import UNITS from "../definitions/UNITS.js";

export function calculateGroupPower(group) {
    if (!group) return 0;
    
    // Base calculation using unit count
    let power = 0;
    
    // If we have detailed units data, use it for better calculations
    if (group.units) {
      // Check if it's an array or object
      if (Array.isArray(group.units)) {
        power = group.units.reduce((total, unit) => {
          // Get unit type/id and look up power from UNITS definition
          const unitType = unit.type || unit.id;
          // Use UNITS power if available, fallback to unit.strength or default to 1
          const unitPower = unitType && UNITS[unitType] ? 
            UNITS[unitType].power : (unit.strength || 1);
            return total + (unitPower * unit?.quantity || 1);
        }, 0);
      } else {
        // Handle object format (keys are unit IDs)
        power = Object.values(group.units).reduce((total, unit) => {
          const unitType = unit.type || unit.id;
          const unitPower = unitType && UNITS[unitType] ? 
            UNITS[unitType].power : (unit.strength || 1);
          return total + (unitPower * unit?.quantity || 1);
        }, 0);
      }
    }
    
    // Ensure minimum power of 1 for any group that exists
    return Math.max(1, power);
};