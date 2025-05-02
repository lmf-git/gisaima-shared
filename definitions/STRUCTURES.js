/**
 * Structure definitions for Gisaima
 */

export const STRUCTURES = {
  'monster_lair': {
    name: "Monster Lair",
    buildCost: {
      'Wooden Sticks': 8,
      'Stone Pieces': 6
    },
    buildTime: 1,
    capacity: 10,
    features: ['basic_storage', 'monster_spawning']
  },
  'monster_fortress': {
    name: "Monster Fortress",
    buildCost: {
      'Wooden Sticks': 15,
      'Stone Pieces': 12,
      'Monster Hide': 5
    },
    buildTime: 2,
    capacity: 25,
    features: ['advanced_storage', 'monster_defense', 'monster_spawning']
  },
  'monster_hive': {
    name: "Monster Hive",
    buildCost: {
      'Wooden Sticks': 10,
      'Stone Pieces': 8,
      'Monster Blood': 3
    },
    buildTime: 1,
    capacity: 15,
    features: ['monster_spawning', 'rapid_growth']
  },
  'basic_shelter': {
    name: 'Basic Shelter',
    description: 'A simple shelter providing minimal protection',
    type: 'shelter',
    durability: 100,
    bonuses: {
      defense: 1
    },
    requiredResources: [
      { name: 'wood', quantity: 5 },
      { name: 'stone', quantity: 3 }
    ],
    buildTime: 2, // in ticks
    features: [
      {
        name: 'Basic Shelter',
        description: 'Provides basic protection from elements',
        icon: '🏠'
      }
    ]
  },
  
  'watchtower': {
    name: 'Watchtower',
    description: 'Provides vision over surrounding area',
    type: 'watchtower',
    durability: 150,
    sightRange: 2,
    bonuses: {
      detection: 2
    },
    requiredResources: [
      { name: 'wood', quantity: 8 },
      { name: 'stone', quantity: 5 }
    ],
    buildTime: 3,
    features: [
      {
        name: 'Lookout',
        description: 'Allows spotting of approaching forces',
        icon: '👁️'
      }
    ]
  },
  
  'storage': {
    name: 'Storage Depot',
    description: 'Stores additional resources',
    type: 'storage',
    durability: 80,
    capacity: 10,
    requiredResources: [
      { name: 'wood', quantity: 6 },
      { name: 'stone', quantity: 2 },
      { name: 'fiber', quantity: 4 }
    ],
    buildTime: 2,
    features: [
      {
        name: 'Storage',
        description: 'Stores additional resources',
        icon: '📦'
      }
    ]
  },
  
  'workshop': {
    name: 'Workshop',
    description: 'Allows crafting of basic items',
    type: 'workshop',
    durability: 120,
    craftingSpeed: 1.5,
    requiredResources: [
      { name: 'wood', quantity: 10 },
      { name: 'stone', quantity: 8 },
      { name: 'metal', quantity: 3 }
    ],
    buildTime: 5,
    features: [
      {
        name: 'Crafting',
        description: 'Allows crafting of items',
        icon: '🔨'
      }
    ]
  }
};

export const STRUCTURE_TYPES = Object.keys(STRUCTURES);
