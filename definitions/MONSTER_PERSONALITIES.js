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
      explore: 1.2, // Increased from 0.8
      build: 0.5,
      gather: 0.5, // Increased from 0.3
      steal: 0.5,  // Increased from 0.3
      merge: 1.2,  // Added merge weight
      joinBattle: 1.8  // Added join battle weight
    },
    canAttackMonsters: true,
    attackMonsters: 0.8, // Added specific weight for monster-vs-monster combat
    structureInteractionPreference: 'attack',
    // Added interruption settings
    pathInterruption: {
      combatThreshold: 0.2,    // Very likely to interrupt for combat
      resourceThreshold: 0.7,  // Unlikely to interrupt for resources
      detectionRadius: 5       // Large detection radius
    }
  },

  // Sneaky monsters prioritize stealing over direct combat
  SNEAKY: {
    id: 'SNEAKY',
    name: 'Sneaky',
    emoji: '🦝',
    description: 'Prefers stealing over direct confrontation',
    weights: {
      attack: 0.6, // Slightly increased from 0.5
      explore: 1.4, // Increased from 1.2
      build: 0.8, // Slightly increased from 0.7
      gather: 1.2, // Increased from 1.0
      steal: 2.0,
      merge: 0.7, // Added merge weight
      joinBattle: 0.4 // Added join battle weight
    },
    returnAfterSteal: true,
    structureInteractionPreference: 'steal',
    // Added interruption settings
    pathInterruption: {
      combatThreshold: 0.7,    // Unlikely to interrupt for combat
      resourceThreshold: 0.2,  // Very likely to interrupt for resources
      detectionRadius: 4       // Good detection radius for spotting resources
    }
  },

  // Feral monsters are unpredictable and chaotic
  FERAL: {
    id: 'FERAL',
    name: 'Feral',
    emoji: '🐺',
    description: 'Wild and unpredictable behavior',
    weights: {
      attack: 1.8, // Increased from 1.5
      explore: 1.8, // Increased from 1.5
      build: 0.4, // Slightly increased from 0.3
      gather: 0.9, // Slightly increased from 0.7
      steal: 1.2, // Increased from 1.0
      merge: 0.5, // Added merge weight
      joinBattle: 1.5, // Added join battle weight
      attackMonsters: 1.5 // High weight for attacking other monsters
    },
    canAttackMonsters: true,
    randomBattleSides: true,
    structureInteractionPreference: 'random',
    // Added interruption settings
    pathInterruption: {
      combatThreshold: 0.1,    // Extremely likely to interrupt for combat
      resourceThreshold: 0.6,  // Somewhat likely to interrupt for resources
      detectionRadius: 3,      // Standard detection radius
      randomInterruptions: true // Can randomly change course for no reason
    }
  },

  // Territorial monsters prioritize defending and building their territory
  TERRITORIAL: {
    id: 'TERRITORIAL',
    name: 'Territorial',
    emoji: '🏰',
    description: 'Defends territory and builds structures',
    weights: {
      attack: 1.2, // Increased from 1.0
      explore: 0.6, // Slightly increased from 0.5
      build: 2.0, // Increased from 1.8
      gather: 1.4, // Increased from 1.2
      steal: 0.9, // Slightly increased from 0.8
      merge: 1.5, // Added merge weight - likes to grow
      joinBattle: 1.0 // Added join battle weight
    },
    homeRange: 15,
    structureInteractionPreference: 'steal_then_return',
    pathInterruption: {
      combatThreshold: 0.4,      // Moderately likely to interrupt for combat
      resourceThreshold: 0.5,    // Moderately likely to interrupt for resources
      structureThreshold: 0.3,   // Very likely to interrupt for structures
      detectionRadius: 3         // Standard detection radius
    }
  },

  // Cautious monsters avoid confrontation when possible
  CAUTIOUS: {
    id: 'CAUTIOUS',
    name: 'Cautious',
    emoji: '🦔',
    description: 'Avoids direct confrontation when possible',
    weights: {
      attack: 0.5, // Slightly increased from 0.4
      explore: 1.2, // Slightly increased from 1.0
      build: 1.0, // Slightly increased from 0.9
      gather: 1.6, // Increased from 1.4
      steal: 1.7, // Increased from 1.5
      merge: 0.9, // Added merge weight
      joinBattle: 0.3 // Added join battle weight - avoids conflict
    },
    fleeThreshold: 0.7,
    structureInteractionPreference: 'steal',
    pathInterruption: {
      combatThreshold: 0.8,      // Very unlikely to interrupt for combat
      resourceThreshold: 0.3,    // Likely to interrupt for resources
      detectionRadius: 2         // Smaller detection radius - less distractible
    }
  },

  // Nomadic monsters prioritize exploration and movement
  NOMADIC: {
    id: 'NOMADIC',
    name: 'Nomadic',
    emoji: '🐫',
    description: 'Wanders widely and explores',
    weights: {
      attack: 0.8, // Slightly increased from 0.7
      explore: 2.2, // Increased from 2.0
      build: 0.5, // Slightly increased from 0.4
      gather: 1.2, // Increased from 1.0
      steal: 1.4, // Increased from 1.2
      merge: 0.6, // Added merge weight - prefers smaller groups
      joinBattle: 0.7 // Added join battle weight
    },
    movementSpeedBonus: 1.3,
    structureInteractionPreference: 'steal_and_move',
    pathInterruption: {
      combatThreshold: 0.6,      // Somewhat unlikely to interrupt for combat
      resourceThreshold: 0.4,    // Moderately likely to interrupt for resources
      detectionRadius: 4,        // Larger detection radius - explores more
      movementChangeProbability: 0.4 // More likely to change direction randomly
    }
  },
  
  // Balanced is the default personality
  BALANCED: {
    id: 'BALANCED',
    name: 'Balanced',
    emoji: '⚖️',
    description: 'Balanced behavior across all activities',
    weights: {
      attack: 1.0,
      explore: 1.0,
      build: 1.0,
      gather: 1.0,
      steal: 1.0,
      merge: 1.0,
      joinBattle: 1.0
    },
    structureInteractionPreference: 'balanced',
    pathInterruption: {
      combatThreshold: 0.5,      // Average likelihood for all interruptions
      resourceThreshold: 0.5,
      structureThreshold: 0.5,
      detectionRadius: 3         // Standard detection radius
    }
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
