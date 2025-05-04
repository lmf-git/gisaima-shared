import UNITS from "../definitions/UNITS.js";

export function calculateGroupPower(group) {
    if (!group) return 0;
    
    // Base calculation using unit count
    let power = Object.values(group.units).reduce((total, unit) => {
      return total + (UNITS[unit.type].power || 1);
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
 * @param {number} sidePower - The power of the side receiving casualties
 * @param {number} sideRatio - The power ratio of the side receiving casualties
 * @param {number} opposingRatio - The power ratio of the opposing side
 */
export function calculateAttrition(sidePower, sideRatio, opposingRatio) {
  // Base attrition per tick (5-10% of opponent's power)
  const baseAttritionRate = 0.05 + (Math.random() * 0.05);
  
  // Calculate raw attrition
  let attrition = Math.round(sidePower * baseAttritionRate * (opposingRatio + 0.5));
  
  // Power dominance factor - how much stronger the opposing side is
  // opposingRatio near 1.0 means opponent is very dominant
  const powerDominance = Math.max(0, opposingRatio * 2 - 0.5); // Scale to 0-1.5 range
  
  // Chance of taking zero casualties decreases as opponent's power dominance increases
  // When opposingRatio is 0.95+ (extreme dominance by opponent), high chance of casualties
  const zeroAttritionChance = Math.min(0.9, (1 - powerDominance) * 0.95);
  
  // Apply chance of zero attrition for dominant forces
  if (sideRatio > 0.75 && Math.random() < zeroAttritionChance) {
    attrition = 0;
    console.log(`Side with ${sideRatio.toFixed(2)} power ratio takes no casualties due to overwhelming advantage`);
  } 
  // For weaker sides or when random chance doesn't lead to zero attrition
  else if (sidePower > 0) {
    // Ensure minimum attrition of 1 to keep battles progressing
    attrition = Math.max(1, attrition);
  }
  
  return attrition;
}

/**
 * Selects units to be removed as casualties based on attrition count
 * Returns an object with units to remove and players killed
 */
export function selectUnitsForCasualties(units, attritionCount) {
  if (!units || attritionCount <= 0) {
    return { unitsToRemove: [], playersKilled: [] };
  }
  
  const unitIds = Object.keys(units);
  const totalUnits = unitIds.length;
  let remainingAttrition = Math.min(attritionCount, totalUnits);
  const unitsToRemove = [];
  const playersKilled = [];
  
  // Check if there's only one unit and it's a player - no special protection in this case
  // But still respect the attrition count - only kill if attrition > 0
  if (totalUnits === 1 && units[unitIds[0]].type === 'player' && remainingAttrition > 0) {
    // When only a player unit exists in the group, they get no special protection
    const playerUnit = units[unitIds[0]];
    unitsToRemove.push(unitIds[0]);
    
    playersKilled.push({
      playerId: playerUnit.id,
      displayName: playerUnit.displayName || "Unknown Player"
    });
    
    return { unitsToRemove, playersKilled };
  }
  
  // Normal case: First remove regular (non-player) units
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