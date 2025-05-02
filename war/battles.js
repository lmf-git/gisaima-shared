import UNITS from "../definitions/UNITS.js";

export function calculateGroupPower(group) {
    if (!group) return 0;
    
    // Base calculation using unit count
    let power = Object.values(group.units).reduce((total, unit) => {
      const unitType = unit.type;
      const unitPower = unitType && UNITS[unitType] ? 
        UNITS[unitType].power : (unit.strength || 1);
      return total + (unitPower || 1);
    }, 0);
    
    // Ensure minimum power of 1 for any group that exists
    return Math.max(1, power);
};

/**
 * Calculates power ratios between two sides in battle
 */
export function calculatePowerRatios(side1Power, side2Power) {
  const totalPower = side1Power + side2Power;
  return {
    side1Ratio: totalPower > 0 ? side1Power / totalPower : 0.5,
    side2Ratio: totalPower > 0 ? side2Power / totalPower : 0.5
  };
}

/**
 * Calculates attrition (damage) based on power values and ratios
 */
export function calculateAttrition(sidePower, powerRatio) {
  // Base attrition per tick (5-10% of opponent's power)
  const baseAttritionRate = 0.05 + (Math.random() * 0.05);
  // The side with more power deals more damage (powerRatio + 0.5 as advantage multiplier)
  return Math.round(sidePower * baseAttritionRate * (powerRatio + 0.5));
}

/**
 * Selects units to be removed as casualties based on attrition count
 * Returns an object with units to remove and players killed
 */
export function selectUnitsForCasualties(units, attritionCount) {
  if (!units) return { unitsToRemove: [], playersKilled: [] };
  
  const unitIds = Object.keys(units);
  const totalUnits = unitIds.length;
  let remainingAttrition = Math.min(attritionCount, totalUnits);
  const unitsToRemove = [];
  const playersKilled = [];
  
  // First remove regular (non-player) units
  const regularUnitIds = unitIds.filter(id => units[id].type !== 'player');
  
  while (remainingAttrition > 0 && regularUnitIds.length > 0) {
    const randomIndex = Math.floor(Math.random() * regularUnitIds.length);
    const unitToRemove = regularUnitIds.splice(randomIndex, 1)[0];
    unitsToRemove.push(unitToRemove);
    remainingAttrition--;
  }
  
  // If we still need to remove more units, and we only have player units left
  if (remainingAttrition > 0) {
    const playerUnitIds = unitIds.filter(id => units[id].type === 'player');
    
    while (remainingAttrition > 0 && playerUnitIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * playerUnitIds.length);
      const playerUnitId = playerUnitIds.splice(randomIndex, 1)[0];
      const playerUnit = units[playerUnitId];
      
      playersKilled.push({
        playerId: playerUnit.id,
        displayName: playerUnit.displayName || "Unknown Player"
      });
      
      unitsToRemove.push(playerUnitId);
      remainingAttrition--;
    }
  }
  
  return { unitsToRemove, playersKilled };
}

/**
 * Determines the winner of a battle based on final power values
 * Returns: 0 for draw, 1 for side1 win, 2 for side2 win
 */
export function determineWinner(side1Power, side2Power) {
  if (side1Power <= 0 && side2Power <= 0) {
    // Rather than a true draw, pick a side with slight advantage or random if exactly equal
    if (side1Power > side2Power) return 1;
    if (side2Power > side1Power) return 2;
    // If exactly equal at 0, random winner
    return Math.random() < 0.5 ? 1 : 2;
  }
  
  if (side1Power > side2Power) return 1; // Side 1 wins
  if (side2Power > side1Power) return 2; // Side 2 wins
  
  // In case of exact tie with power > 0, use random selection
  // This is extremely unlikely due to the random factor in power calculation
  return Math.random() < 0.5 ? 1 : 2;
}