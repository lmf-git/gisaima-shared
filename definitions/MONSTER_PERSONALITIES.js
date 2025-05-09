/**
 * Monster personality definitions for Gisaima
 * These personalities influence monster behavior including combat, movement, and interactions
 */

export const MONSTER_PERSONALITIES = {
  // Aggressive monsters prioritize direct combat
  AGGRESSIVE: {
    id: 'AGGRESSIVE',
    name: 'Aggressive',
    emoji: '👹',
    description: 'Prioritizes attacking players and structures',
    weights: {
      attack: 2.0,
      explore: 0.8,
      build: 0.5,
      gather: 0.3,
      steal: 0.3  // Prefers combat over theft
    },
    canAttackMonsters: true,
    structureInteractionPreference: 'attack' // Prefers attacking structures over stealing
  },

  // Sneaky monsters prioritize stealing over direct combat
  SNEAKY: {
    id: 'SNEAKY',
    name: 'Sneaky',
    emoji: '🦝',
    description: 'Prefers stealing over direct confrontation',
    weights: {
      attack: 0.5,
      explore: 1.2,
      build: 0.7,
      gather: 1.0,
      steal: 2.0  // High preference for stealing
    },
    returnAfterSteal: true,
    structureInteractionPreference: 'steal' // Prefers stealing from structures over attacking
  },

  // Feral monsters are unpredictable and chaotic
  FERAL: {
    id: 'FERAL',
    name: 'Feral',
    emoji: '🐺',
    description: 'Wild and unpredictable behavior',
    weights: {
      attack: 1.5,
      explore: 1.5,
      build: 0.3,
      gather: 0.7,
      steal: 1.0  // Average preference for stealing
    },
    canAttackMonsters: true,
    randomBattleSides: true,
    structureInteractionPreference: 'random' // Randomly chooses between attack and steal
  },

  // Territorial monsters prioritize defending and building their territory
  TERRITORIAL: {
    id: 'TERRITORIAL',
    name: 'Territorial',
    emoji: '🏰',
    description: 'Defends territory and builds structures',
    weights: {
      attack: 1.0,
      explore: 0.5,
      build: 1.8,
      gather: 1.2,
      steal: 0.8  // Moderate preference for stealing
    },
    homeRange: 15, // Tends to stay within this range of home structure
    structureInteractionPreference: 'steal_then_return' // Steals and then returns to base
  },

  // Cautious monsters avoid confrontation when possible
  CAUTIOUS: {
    id: 'CAUTIOUS',
    name: 'Cautious',
    emoji: '🦔',
    description: 'Avoids direct confrontation when possible',
    weights: {
      attack: 0.4,
      explore: 1.0,
      build: 0.9,
      gather: 1.4,
      steal: 1.5  // High preference for stealing
    },
    fleeThreshold: 0.7, // Flees from battle more easily
    structureInteractionPreference: 'steal' // Prefers stealing from structures over attacking
  },

  // Nomadic monsters prioritize exploration and movement
  NOMADIC: {
    id: 'NOMADIC',
    name: 'Nomadic',
    emoji: '🐫',
    description: 'Wanders widely and explores',
    weights: {
      attack: 0.7,
      explore: 2.0,
      build: 0.4,
      gather: 1.0,
      steal: 1.2  // Above average preference for stealing
    },
    movementSpeedBonus: 1.3, // Moves faster
    structureInteractionPreference: 'steal_and_move' // Steals and keeps wandering
  }
};

/**
 * Get a random monster personality
 * @param {string} monsterType - Type of monster (can influence personality selection)
 * @returns {Object} Selected personality object
 */
export function getRandomPersonality(monsterType) {
  const personalities = Object.values(MONSTER_PERSONALITIES);
  
  // Check UNITS.js for preferred personalities based on monster type
  // Default to random selection
  return personalities[Math.floor(Math.random() * personalities.length)];
}

/**
 * Determine if a monster's personality should change
 * @param {Object} monsterGroup - Monster group data
 * @param {number} now - Current timestamp
 * @returns {boolean} True if personality should change
 */
export function shouldChangePersonality(monsterGroup, now) {
  // Base chance is 0.5% per tick for personality change
  const baseChance = 0.005;
  
  // Don't change personality too frequently (minimum 30 minutes)
  if (monsterGroup.lastPersonalityChange && 
      now - monsterGroup.lastPersonalityChange < 1800000) {
    return false;
  }
  
  // Increase chance if monster has experienced certain events
  let finalChance = baseChance;
  
  // Monsters that have been in battle recently are more likely to change
  if (monsterGroup.lastBattleTime && now - monsterGroup.lastBattleTime < 3600000) {
    finalChance *= 2; // Double chance if in battle within last hour
  }
  
  // Monsters that have stolen items recently might change
  if (monsterGroup.hasStolenItems) {
    finalChance *= 1.5; // 50% more likely if has stolen items
  }
  
  // Feral personality is more unstable
  if (monsterGroup.personality?.id === 'FERAL') {
    finalChance *= 3; // Triple chance for feral monsters
  }
  
  // Territorial personality is more stable
  if (monsterGroup.personality?.id === 'TERRITORIAL') {
    finalChance *= 0.5; // Half chance for territorial monsters
  }
  
  return Math.random() < finalChance;
}
