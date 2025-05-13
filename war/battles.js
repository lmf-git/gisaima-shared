import UNITS from "../definitions/UNITS.js";
import { getItemPower } from "../definitions/ITEMS.js";


// Calculate power for an individual group
export function calculateGroupPower(group) {
  if (!group) return 0;
  
  // Base power from units
  const unitPower = calculateUnitPower(group);
  
  // Additional power from items
  const itemPower = calculateItemPower(group);
  
  // Total group power is sum of unit power and item power
  return unitPower + itemPower;
}

// Calculate power from units only
function calculateUnitPower(group) {
  if (!group || !group.units) return 0;
  
  const units = group.units;
  let power = 0;
  
  // Sum up power for each unit
  for (const unitId in units) {
    const unit = units[unitId];
      // Use power from UNITS definition if available, otherwise default to 1
      const unitType = unit.type || unit.unitType;
      let unitPower = 1; // Default power
      
      // Search for matching unit in UNITS definition
      for (const key in UNITS) {
        if (UNITS[key].type === unitType || key === unitType) {
          unitPower = UNITS[key].power || 1;
          break;
        }
      }
      
      power += unitPower;
    
    // Add power from unit's level if available
    if (unit.level) {
      power += unit.level;
    }
  }
  
  return power;
}

// Calculate power contribution from group's items
function calculateItemPower(group) {
  if (!group || !group.items) return 0;
  
  // Convert items to array if it's an object
  const items = Array.isArray(group.items) ? group.items : Object.values(group.items);
  
  let totalItemPower = 0;
  
  // Process each item and sum up power contributions
  items.forEach(item => {
    if (item && item.id) {
      // Get item power using helper function
      const power = getItemPower(item.id);
      
      // Factor in quantity if available
      const quantity = item.quantity || 1;
      totalItemPower += power * quantity;
    }
  });
  
  return totalItemPower;
}

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
  
  // IMPROVED: Allow dominant sides to sometimes avoid casualties
  // If this side is clearly dominant (high ratio > 0.7) and facing a much weaker opponent (ratio < 0.3)
  if (sideRatio > 0.7 && opposingRatio < 0.3) {
    // Higher chance to avoid casualties when dominance is greater
    const dominanceDelta = sideRatio - opposingRatio;
    const noCasualtyChance = Math.min(0.8, dominanceDelta * 0.9); // 80% max chance for no casualties
    
    if (Math.random() < noCasualtyChance) {
      console.log(`Dominant side with ${sideRatio.toFixed(2)} power ratio avoids casualties due to overwhelming advantage`);
      return 0;
    }
    
    console.log(`Dominant side with ${sideRatio.toFixed(2)} power ratio takes minimal casualties`);
    return 1; // Minimum casualties when dominant side does take damage
  }
  
  // FIXED: Only allow zero attrition for weaker sides (lower ratio = weaker)
  // This means a powerful side can't avoid casualties when facing a weaker opponent
  if (opposingRatio > 0.75 && sideRatio < 0.25 && Math.random() < zeroAttritionChance) {
    attrition = 0;
    console.log(`Side with ${sideRatio.toFixed(2)} power ratio takes no casualties due to random chance`);
  } 
  // For more balanced sides or when random chance doesn't lead to zero attrition
  else if (sidePower > 0) {
    // MODIFIED: Only ensure minimum attrition of 1 if sides are relatively balanced
    // This allows battles with clear power differences to resolve without forcing casualties
    const isCloselyMatched = Math.abs(sideRatio - 0.5) < 0.25; // Within 25% of even match
    
    if (isCloselyMatched) {
      // For closely matched battles, ensure some casualties to prevent stalemates
      attrition = Math.max(1, attrition);
      console.log(`Close battle: ensuring minimum attrition of 1 for side with ${sideRatio.toFixed(2)} ratio`);
    } else if (attrition === 0 && sideRatio < 0.4) {
      // For unbalanced battles where weaker side would take 0 attrition, 
      // still apply some chance of taking casualties to prevent permanent stalemates
      const unluckyChance = 0.3 + (0.4 - sideRatio); // Higher chance as ratio decreases
      if (Math.random() < unluckyChance) {
        attrition = 1;
        console.log(`Unlucky weaker side (${sideRatio.toFixed(2)}) takes 1 attrition despite low calculation`);
      }
    }
    
    // ADDED: Log to show casualties are being applied to a weak side
    if (opposingRatio > 0.75 && sideRatio < 0.25 && attrition > 0) {
      console.log(`Weaker side with ${sideRatio.toFixed(2)} power ratio takes ${attrition} casualties`);
    }
  }
  
  return attrition;
}

/**
 * Specialized function for player vs player combat mechanics
 * Determines critical hits and other PvP-specific effects
 * @param {Object} side1 - The first combat side
 * @param {Object} side2 - The second combat side
 * @param {number} tickCount - Current battle tick count
 * @returns {Object} Modified side objects with PvP combat flags
 */
export function processPvPCombat(side1, side2, tickCount) {
  // Detect if sides contain player units
  const side1Players = extractSoloPlayerUnits(side1);
  const side2Players = extractSoloPlayerUnits(side2);
  
  // Skip if either side has no players
  if (side1Players.length === 0 || side2Players.length === 0) {
    return { side1, side2 };
  }
  
  console.log(`PvP combat detected: ${side1Players.length} players vs ${side2Players.length} players`);
  
  // Mark all units as being in PvP combat
  side1Players.forEach(player => {
    player.unit.pvpCombat = true;
    // Store number of opposing players to adjust mechanics
    player.unit.opposingPlayerCount = side2Players.length;
  });
  
  side2Players.forEach(player => {
    player.unit.pvpCombat = true;
    // Store number of opposing players to adjust mechanics
    player.unit.opposingPlayerCount = side1Players.length;
  });
  
  // TEAM ADVANTAGE: Check for team size advantage
  const side1TeamAdvantage = side1Players.length > side2Players.length;
  const side2TeamAdvantage = side2Players.length > side1Players.length;
  
  // Calculate base critical hit chance for this tick
  // As battle progresses, critical hits become more likely to resolve stalemates
  const baseCritChance = Math.min(0.4, 0.05 * tickCount); // 5% per tick, up to 40%
  
  // MULTI-PLAYER TARGETING: Assign targets to create engagement pairs
  // This simulates players targeting specific opponents rather than random attacks
  const engagementPairs = createEngagementPairs(side1Players, side2Players);
  
  // Process critical hits for side 1 players based on their assigned targets
  side1Players.forEach(player => {
    // Find this player's target if one exists
    const targetInfo = engagementPairs.find(pair => pair.attacker.id === player.id);
    const target = targetInfo?.defender;
    
    // Calculate critical hit chance based on multiple factors
    let critChance = baseCritChance;
    
    // Level advantage modifier
    const levelAdvantage = target ? 
      (player.unit.level || 1) - (target.unit.level || 1) : 0;
    critChance += levelAdvantage * 0.05;
    
    // Team advantage modifier - having more teammates makes critical hits more likely
    if (side1TeamAdvantage) {
      const teamBonus = 0.05 * Math.min(3, side1Players.length - side2Players.length);
      critChance += teamBonus;
      player.unit.teamAdvantage = true; // Flag for combat text
    }
    
    // Check if player is outnumbered, give slight disadvantage
    if (side2TeamAdvantage) {
      player.unit.outnumbered = true; // Flag for combat text
    }
    
    // Ensure chance is within bounds
    critChance = Math.max(0.05, Math.min(0.7, critChance));
    
    // ENHANCED: In close combat situations, increase critical hit chances to help break ties
    // This helps prevent draws in PvP where both players die
    if (side1Players.length === 1 && side2Players.length === 1 && tickCount >= 3) {
      critChance += 0.1; // Add 10% to crit chance in protracted 1v1 duels
      console.log(`Duel critical chance increased for ${player.unit.displayName || player.id} to ${critChance.toFixed(2)}`);
    }
    
    // Roll for critical hit
    if (Math.random() < critChance) {
      player.unit.criticalHit = true;
      player.unit.targetId = target?.id; // Store target ID for combat messages
      
      if (player.unit.teamAdvantage) {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit with team advantage!`);
      } else {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit!`);
      }
    }
  });
  
  // Process critical hits for side 2 players based on their assigned targets
  side2Players.forEach(player => {
    // Find this player's target if one exists
    const targetInfo = engagementPairs.find(pair => pair.defender.id === player.id);
    const target = targetInfo?.attacker; // This player is a defender, so their target is the attacker
    
    // Calculate critical hit chance based on multiple factors
    let critChance = baseCritChance;
    
    // Level advantage modifier
    const levelAdvantage = target ? 
      (player.unit.level || 1) - (target.unit.level || 1) : 0;
    critChance += levelAdvantage * 0.05;
    
    // Team advantage modifier - having more teammates makes critical hits more likely
    if (side2TeamAdvantage) {
      const teamBonus = 0.05 * Math.min(3, side2Players.length - side1Players.length);
      critChance += teamBonus;
      player.unit.teamAdvantage = true; // Flag for combat text
    }
    
    // Check if player is outnumbered, give slight disadvantage
    if (side1TeamAdvantage) {
      player.unit.outnumbered = true; // Flag for combat text
    }
    
    // Ensure chance is within bounds
    critChance = Math.max(0.05, Math.min(0.7, critChance));
    
    // Roll for critical hit
    if (Math.random() < critChance) {
      player.unit.criticalHit = true;
      player.unit.targetId = target?.id; // Store target ID for combat messages
      
      if (player.unit.teamAdvantage) {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit with team advantage!`);
      } else {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit!`);
      }
    }
  });
  
  // Apply chain reaction effects for critical hits
  // If multiple players on one side land critical hits, enhance their effect
  const side1CriticalHits = side1Players.filter(p => p.unit.criticalHit).length;
  const side2CriticalHits = side2Players.filter(p => p.unit.criticalHit).length;
  
  // If a side has multiple critical hits, mark them as combo for extra effect
  if (side1CriticalHits > 1) {
    side1Players.forEach(player => {
      if (player.unit.criticalHit) {
        player.unit.comboCritical = true;
        console.log(`Player ${player.unit.displayName || player.id} critical hit is part of a ${side1CriticalHits}x combo!`);
      }
    });
  }
  
  if (side2CriticalHits > 1) {
    side2Players.forEach(player => {
      if (player.unit.criticalHit) {
        player.unit.comboCritical = true;
        console.log(`Player ${player.unit.displayName || player.id} critical hit is part of a ${side2CriticalHits}x combo!`);
      }
    });
  }
  
  return { side1, side2 };
}

/**
 * Create engagement pairs between two sides of players
 * This simulates how players would target specific opponents in battle
 * @param {Array} attackers - Players on attacking side
 * @param {Array} defenders - Players on defending side
 * @returns {Array} Array of {attacker, defender} pairs
 */
function createEngagementPairs(attackers, defenders) {
  const pairs = [];
  
  // Make copies to avoid modifying the original arrays
  const remainingAttackers = [...attackers];
  const remainingDefenders = [...defenders];
  
  // First pass: Try to match players 1-to-1 until one side is exhausted
  while (remainingAttackers.length > 0 && remainingDefenders.length > 0) {
    // Get a random attacker and defender
    const attackerIndex = Math.floor(Math.random() * remainingAttackers.length);
    const defenderIndex = Math.floor(Math.random() * remainingDefenders.length);
    
    const attacker = remainingAttackers.splice(attackerIndex, 1)[0];
    const defender = remainingDefenders.splice(defenderIndex, 1)[0];
    
    pairs.push({ attacker, defender });
  }
  
  // Second pass: If there are leftover attackers, pair them with already paired defenders
  if (remainingAttackers.length > 0 && defenders.length > 0) {
    remainingAttackers.forEach(attacker => {
      // Choose a random defender from the original list to "gang up" on
      const targetDefender = defenders[Math.floor(Math.random() * defenders.length)];
      pairs.push({ 
        attacker, 
        defender: targetDefender,
        gangUp: true // Flag that this defender is being targeted by multiple attackers
      });
    });
  }
  
  // Third pass: If there are leftover defenders, pair them with already paired attackers
  if (remainingDefenders.length > 0 && attackers.length > 0) {
    remainingDefenders.forEach(defender => {
      // Choose a random attacker from the original list to "gang up" on
      const targetAttacker = attackers[Math.floor(Math.random() * attackers.length)];
      pairs.push({ 
        attacker: targetAttacker, 
        defender,
        gangUp: true // Flag that this attacker is being targeted by multiple defenders
      });
    });
  }
  
  return pairs;
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
  
  // Detect PvP - is this a solo player facing others?
  const isSoloPlayer = (totalUnits === 1 && units[unitIds[0]].type === 'player');
  const isPvpCombat = units[unitIds[0]]?.pvpCombat === true;
  
  // IMPROVED PLAYER COMBAT: Special handling for player vs player
  if (isSoloPlayer && isPvpCombat) {
    // In PvP combat, we use critical hits and team dynamics
    const playerUnit = units[unitIds[0]];
    const criticalHit = playerUnit.criticalHit === true;
    const comboCritical = playerUnit.comboCritical === true; // Part of a multi-player combo
    const outnumbered = playerUnit.outnumbered === true;
    const opposingPlayerCount = playerUnit.opposingPlayerCount || 1;
    
    // Calculate effective attrition based on situation
    let effectiveAttrition = remainingAttrition;
    
    // Outnumbered players have higher chance of taking casualties
    if (outnumbered) {
      effectiveAttrition = Math.min(3, effectiveAttrition + 0.5);
    }
    
    // CRITICAL FIX: Players who land critical hits get significant protection from attrition
    if (criticalHit) {
      // Critical hit gives major protection from attrition
      effectiveAttrition = Math.max(0, effectiveAttrition - 1.5);
      
      // Combo critical gives even more protection
      if (comboCritical) {
        effectiveAttrition = Math.max(0, effectiveAttrition - 0.5);
      }
      
      console.log(`Critical hit advantage: Player ${playerUnit.displayName || playerUnit.id} reduces effective attrition from ${remainingAttrition} to ${effectiveAttrition}`);
    }
    
    // Log the special PvP circumstance with all factors
    console.log(`PvP combat for player ${playerUnit.displayName || playerUnit.id}: raw attrition=${remainingAttrition}, effective=${effectiveAttrition}, criticalHit=${criticalHit}, combo=${comboCritical}, outnumbered=${outnumbered}, vs ${opposingPlayerCount} players`);
    
    // Determine if player is killed
    let playerKilled = false;
    
    // Critical hits now protect instead of causing casualties
    if (criticalHit && effectiveAttrition < 2) {
      console.log(`Player ${playerUnit.displayName || playerUnit.id} survives due to critical hit advantage!`);
      playerKilled = false;
    }
    // Higher effective attrition threshold kills
    else if (effectiveAttrition >= 2) {
      console.log(`Player killed in PvP - sufficient attrition (${effectiveAttrition})`);
      playerKilled = true;
    }
    // Small random chance based on attrition
    else if (effectiveAttrition >= 1 && Math.random() < 0.15 * effectiveAttrition) {
      console.log(`Player killed in PvP - lucky strike with attrition ${effectiveAttrition}`);
      playerKilled = true;
    }
    else {
      console.log(`Player survived in PvP (effective attrition: ${effectiveAttrition})`);
    }
    
    if (playerKilled) {
      unitsToRemove.push(unitIds[0]);
      
      playersKilled.push({
        playerId: playerUnit.id,
        displayName: playerUnit.displayName || "Unknown Player",
        killedBy: playerUnit.targetId ? { id: playerUnit.targetId, critical: criticalHit } : undefined
      });
    }
    
    return { unitsToRemove, playersKilled };
  }
  
  // NORMAL SOLO PLAYER: Standard protection for solo player vs monsters/environment
  if (isSoloPlayer) {
    // Fix for potential rounding errors in attrition - ensure 1.9+ rounds to 2
    const adjustedAttrition = Math.round(attritionCount * 10) / 10;
    
    if (adjustedAttrition >= 2) {
      // Only extremely high attrition can kill a lone player
      const playerUnit = units[unitIds[0]];
      unitsToRemove.push(unitIds[0]);
      
      playersKilled.push({
        playerId: playerUnit.id,
        displayName: playerUnit.displayName || "Unknown Player"
      });
      
      console.log(`Solo player unit killed - required higher attrition threshold (${adjustedAttrition})`);
    } else {
      // Player survives with less than 2 attrition
      console.log(`Solo player unit survived due to extra protection (attrition: ${adjustedAttrition})`);
    }
    
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

// Helper function to extract solo player units from a side
function extractSoloPlayerUnits(side) {
  const players = [];
  
  // Check each group in the side
  for (const groupId in side.groups || {}) {
    const group = side.groups[groupId];
    const unitIds = Object.keys(group?.units || {});
    
    // If this is a solo player group, add it to the list
    if (unitIds.length === 1 && group.units[unitIds[0]].type === 'player') {
      players.push({
        id: groupId,
        unitId: unitIds[0],
        unit: group.units[unitIds[0]]
      });
    }
  }
  
  return players;
}

// Calculate level advantage in PvP combat
function getAveragePlayerLevelDifference(player, opponents) {
  // Default level is 1 if not specified
  const playerLevel = player.unit.level || 1;
  
  // If no opponents, no advantage
  if (opponents.length === 0) return 0;
  
  // Calculate average opponent level
  const totalOpponentLevel = opponents.reduce((sum, opponent) => {
    return sum + (opponent.unit.level || 1);
  }, 0);
  
  const averageOpponentLevel = totalOpponentLevel / opponents.length;
  
  // Return the level difference
  return playerLevel - averageOpponentLevel;
}