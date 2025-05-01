export class Battles {
  /**
   * Calculate attrition rates for both sides in a battle
   */
  static calculateAttritionRates(side1Power, side2Power, battle) {
    const totalPower = side1Power + side2Power;
    const powerRatio = Math.min(side1Power, side2Power) / Math.max(side1Power, side2Power);
    
    // Determine if either side has overwhelming advantage
    const side1HasOverwhelmingAdvantage = side1Power >= side2Power * 20;
    const side2HasOverwhelmingAdvantage = side2Power >= side1Power * 20;
    
    // Target battle duration scaling
    const totalUnits = side1Power + side2Power;
    const TARGET_BATTLE_DURATION = Math.ceil(2 + Math.sqrt(totalUnits) / 2);
    
    // Base rates
    const minAttritionRate = totalUnits <= 4 ? 0.3 : 0.15;
    const baseAttritionRate = Math.max(minAttritionRate, (0.7 / TARGET_BATTLE_DURATION) + (powerRatio * 0.05));
    
    // Apply escalation factor
    const tickCount = battle.tickCount || 1;
    const escalationFactor = totalUnits <= 4 ? 
      1.0 + (Math.sqrt(tickCount) * 0.3) :  // Faster escalation for small battles
      1.0 + (Math.sqrt(tickCount - 1) * 0.15); // Normal escalation for larger battles
    
    // Calculate final rates
    let side1AttritionRate = baseAttritionRate * escalationFactor;
    let side2AttritionRate = baseAttritionRate * escalationFactor;
    
    // Apply overwhelming advantage
    if (side1HasOverwhelmingAdvantage) {
      side1AttritionRate = 0;
      side2AttritionRate *= 1.5;
    } else if (side2HasOverwhelmingAdvantage) {
      side2AttritionRate = 0;
      side1AttritionRate *= 1.5;
    }
    
    return { side1AttritionRate, side2AttritionRate };
  }

  /**
   * Calculate how many units will be lost based on group size and attrition rate
   */
  static calculateUnitLosses(groupSize, attritionRate) {
    // For tiny groups, increase baseline probability of casualties
    const expectedLosses = groupSize <= 2 ? 
      groupSize * Math.max(0.5, attritionRate) : // Higher minimum for tiny groups
      groupSize * attritionRate;
    
    // Apply deterministic and probabilistic components
    const deterministicLosses = Math.floor(expectedLosses);
    const remainderProbability = expectedLosses - deterministicLosses;
    
    let unitLosses = deterministicLosses;
    if (Math.random() < remainderProbability) {
      unitLosses += 1;
    }
    
    // Apply consistency factor for small groups
    const consistencyFactor = groupSize <= 2 ? 
      0.85 : // Higher consistency for tiny groups
      1 - Math.min(0.9, 1 / Math.sqrt(groupSize + 1));
    
    if (unitLosses === 0 && Math.random() < consistencyFactor && attritionRate > 0.05) {
      unitLosses = 1; // Minimum loss threshold
    }
    
    return unitLosses;
  }

  /**
   * Process player losses with protection factors
   */
  static processPlayerLosses(remainingLosses, playerUnits, unitsToRemove, playersKilled, groupSize, attritionRate, groupId) {
    if (remainingLosses <= 0 || playerUnits.length === 0) return remainingLosses;
    
    // Solo player protection factor
    const playerProtectionFactor = Math.max(0, 0.7 - (groupSize / 10));
    
    // Small battles should resolve faster
    if (groupSize <= 2 && attritionRate > 0.3) {
      // Higher death chance in small battles
      if (Math.random() > playerProtectionFactor * 0.7) {
        remainingLosses = Math.max(1, remainingLosses);
      }
    } else if (Math.random() < playerProtectionFactor) {
      // Player survives this round in larger battles
      return 0;
    }
    
    // Process remaining player losses
    while (remainingLosses > 0 && playerUnits.length > 0) {
      const randomIndex = Math.floor(Math.random() * playerUnits.length);
      const [unitId, unit] = playerUnits.splice(randomIndex, 1)[0];
      unitsToRemove.push(unitId);
      
      // Track player deaths
      playersKilled.push({
        playerId: unit.id,
        displayName: unit.displayName || 'Unknown Player',
        groupId: groupId
      });
      
      remainingLosses--;
    }
    
    return remainingLosses;
  }

  /**
   * Calculate remaining units after removing some
   */
  static calculateRemainingUnits(group, unitsToRemove) {
    if (!group.units) return 0;
    
    const allUnits = typeof group.units === 'object' ? Object.entries(group.units) : [];
    const removedUnitIds = new Set(unitsToRemove);
    
    return allUnits.filter(([unitId]) => !removedUnitIds.has(unitId)).length;
  }

  /**
   * Generate battle end message
   */
  static generateBattleEndMessage(battle, locationKey, side1Wins) {
    const coords = locationKey.split(',');
    const side1Name = battle.side1?.name || 'Side 1';
    const side2Name = battle.side2?.name || 'Side 2';
    const winnerName = side1Wins ? side1Name : side2Name;
    const loserName = side1Wins ? side2Name : side1Name;
    
    return `Battle at (${coords[0]}, ${coords[1]}) has ended! ${winnerName} has defeated ${loserName}!`;
  }

  /**
   * Calculate total power for a side based on its groups
   */
  static calculateSidePower(groups) {
    if (!groups || groups.length === 0) return 0;
    
    return groups.reduce((total, group) => {
      if (group.empty) return total;
      return total + Battles.calculateGroupPower(group, []);
    }, 0);
  }

  /**
   * Calculate power for a single group
   */
  static calculateGroupPower(group, excludedUnitIds = []) {
    if (!group || !group.units) return 0;
    
    const units = typeof group.units === 'object' ? Object.entries(group.units) : [];
    const excludeSet = new Set(excludedUnitIds);
    
    let power = 0;
    for (const [unitId, unit] of units) {
      if (!excludeSet.has(unitId)) {
        // Each unit contributes 1 power by default
        // Could be expanded with unit strength modifiers
        power += 1;
      }
    }
    
    return power;
  }

  /**
   * Calculate power for a structure
   */
  static calculateStructurePower(structure) {
    if (!structure) return 0;
    
    // Base power from structure type
    const basePower = structure.type === 'fortress' ? 10 :
                      structure.type === 'tower' ? 5 :
                      structure.type === 'camp' ? 2 : 1;
    
    // Health factor
    const healthFactor = structure.health !== undefined ? 
      Math.max(0.1, structure.health / 100) : 1;
    
    return basePower * healthFactor;
  }
}