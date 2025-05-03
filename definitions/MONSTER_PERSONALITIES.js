/**
 * Monster personality definitions for Gisaima
 * These personalities influence monster behavior and decision-making
 */

export const MONSTER_PERSONALITIES = {
  // Combat-focused personalities
  AGGRESSIVE: {
    id: 'AGGRESSIVE',
    name: 'Aggressive',
    description: 'Actively seeks combat and prioritizes attacking player groups and structures',
    emoji: '🔥',
    weights: {
      attack: 2.0,    // More likely to attack
      merge: 0.8,     // Less focused on merging
      gather: 0.5,    // Less interested in gathering
      build: 0.3,     // Not interested in building
      flee: 0.3,      // Unlikely to flee
      explore: 0.7    // Moderate exploration to find targets
    }
  },
  
  TERRITORIAL: {
    id: 'TERRITORIAL',
    name: 'Territorial',
    description: 'Defends a chosen area aggressively, rarely ventures far from it',
    emoji: '🛡️',
    weights: {
      attack: 1.5,    // Attacks intruders
      merge: 1.2,     // Likes to strengthen local forces
      gather: 0.8,    // Some resource gathering in territory
      build: 1.5,     // Builds in their territory
      flee: 0.2,      // Almost never flees
      explore: 0.3    // Minimal exploration
    },
    // Will tend to stay within this radius of their spawn point
    territoryRadius: 10
  },
  
  CURIOUS: {
    id: 'CURIOUS',
    name: 'Curious',
    description: 'Explores widely and sometimes approaches players without attacking',
    emoji: '👀',
    weights: {
      attack: 0.6,    // Less aggressive
      merge: 0.7,     // Not focused on merging
      gather: 1.2,    // Interested in finding resources
      build: 0.5,     // Not much building
      flee: 1.0,      // Normal fleeing behavior
      explore: 2.0    // Very high exploration drive
    }
  },
  
  // Resource-focused personalities
  GREEDY: {
    id: 'GREEDY',
    name: 'Greedy',
    description: 'Prioritizes gathering and hoarding resources',
    emoji: '💰',
    weights: {
      attack: 0.4,    // Only attacks if necessary
      merge: 1.0,     // Normal merging behavior
      gather: 2.0,    // Highly focused on gathering
      build: 1.2,     // Builds to store resources
      flee: 1.2,     // More likely to flee to protect resources
      explore: 1.5    // Explores to find resources
    }
  },
  
  BUILDER: {
    id: 'BUILDER',
    name: 'Builder',
    description: 'Focused on constructing and upgrading monster structures',
    emoji: '🏗️',
    weights: {
      attack: 0.5,    // Not very aggressive
      merge: 1.5,     // Likes to merge for stronger building force
      gather: 1.5,    // Gathers materials for building
      build: 2.0,     // Highly focused on building
      flee: 0.8,      // Moderately defensive
      explore: 0.7    // Limited exploration
    }
  },
  
  // Strategic personalities
  CAUTIOUS: {
    id: 'CAUTIOUS',
    name: 'Cautious',
    description: 'Avoids risky encounters and prioritizes survival',
    emoji: '🐢',
    weights: {
      attack: 0.3,    // Rarely attacks unless strong advantage
      merge: 1.5,     // Likes to merge for safety
      gather: 1.2,    // Gathers when safe
      build: 0.7,     // Limited building
      flee: 2.0,      // Highly likely to flee from danger
      explore: 0.6    // Limited exploration for safety
    }
  },
  
  PROTECTIVE: {
    id: 'PROTECTIVE',
    name: 'Protective',
    description: 'Defends other monster groups and joins battles to help them',
    emoji: '🛂',
    weights: {
      attack: 1.0,    // Normal aggression
      merge: 1.8,     // Highly focused on merging/cooperation
      gather: 0.7,    // Limited gathering
      build: 1.0,     // Normal building
      flee: 0.5,      // Less likely to flee
      explore: 1.0,    // Normal exploration
      joinBattle: 2.0  // Very likely to join battles to help other monsters
    }
  },
  
  NOMADIC: {
    id: 'NOMADIC',
    name: 'Nomadic',
    description: 'Constantly on the move, avoids staying in one place',
    emoji: '🌍',
    weights: {
      attack: 0.8,    // Opportunistic attacks
      merge: 0.7,     // Less focused on merging
      gather: 1.0,    // Normal gathering
      build: 0.3,     // Rarely builds
      flee: 1.3,      // More likely to flee than fight
      explore: 2.0    // Very high exploration drive
    }
  },

  // Default balanced personality
  BALANCED: {
    id: 'BALANCED',
    name: 'Balanced',
    description: 'Shows balanced behavior with no strong preferences',
    emoji: '⚖️',
    weights: {
      attack: 1.0,    // Normal aggression
      merge: 1.0,     // Normal merging
      gather: 1.0,    // Normal gathering
      build: 1.0,     // Normal building
      flee: 1.0,      // Normal fleeing
      explore: 1.0    // Normal exploration
    }
  }
};

/**
 * Get a random personality for a newly spawned monster group
 * @param {string} monsterType - Type of monster
 * @param {string} biome - Current biome
 * @returns {Object} Selected personality object
 */
export function getRandomPersonality(monsterType = null, biome = null) {
  // Could add monster-specific or biome-specific weighting here in the future
  
  const personalities = Object.values(MONSTER_PERSONALITIES);
  // Use weighted randomization - some personalities are rarer than others
  const weights = {
    BALANCED: 0.25,
    AGGRESSIVE: 0.15,
    TERRITORIAL: 0.15,
    CURIOUS: 0.10,
    GREEDY: 0.10,
    BUILDER: 0.05,
    CAUTIOUS: 0.10,
    PROTECTIVE: 0.05,
    NOMADIC: 0.05
  };
  
  // Create weighted distribution
  const distribution = [];
  for (const personality of personalities) {
    const weight = weights[personality.id] || 0.05;
    // Add entries to distribution based on weight (scaled by 100)
    for (let i = 0; i < weight * 100; i++) {
      distribution.push(personality);
    }
  }
  
  // Pick randomly from distribution
  return distribution[Math.floor(Math.random() * distribution.length)];
}

/**
 * Check if a personality change should occur
 * @returns {boolean} True if personality should change
 */
export function shouldChangePersonality() {
  // 0.5% chance of personality change each tick when evaluated
  return Math.random() < 0.005;
}

/**
 * Get a new personality for a monster group that's changing
 * @param {string} currentPersonalityId - The current personality ID to avoid
 * @returns {Object} New personality object
 */
export function getNewPersonality(currentPersonalityId) {
  const personalities = Object.values(MONSTER_PERSONALITIES).filter(
    p => p.id !== currentPersonalityId
  );
  
  return personalities[Math.floor(Math.random() * personalities.length)];
}
