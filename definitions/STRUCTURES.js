export const STRUCTURES = {
  'monster_lair': {
    name: "Monster Lair",
    description: "A basic monster dwelling",
    type: "monster_lair",
    requiredResources: [
      { id: 'WOODEN_STICKS', quantity: 8 },
      { id: 'STONE_PIECES', quantity: 6 }
    ],
    buildTime: 1,
    capacity: 10,
    durability: 120, // Increased from 80
    features: [
      {
        name: 'Basic Storage',
        description: 'Stores resources and items',
        icon: '📦'
      },
      {
        name: 'Monster Spawning',
        description: 'Allows new monsters to join',
        icon: '🐾'
      }
    ],
    monster: true
  },
  'monster_fortress': {
    name: "Monster Fortress",
    description: "A fortified monster stronghold",
    type: "monster_fortress",
    requiredResources: [
      { id: 'WOODEN_STICKS', quantity: 15 },
      { id: 'STONE_PIECES', quantity: 12 },
      { id: 'MONSTER_HIDE', quantity: 5 }
    ],
    buildTime: 2,
    capacity: 25,
    durability: 200, // Increased from 80
    features: [
      {
        name: 'Advanced Storage',
        description: 'Stores more resources and items',
        icon: '📦'
      },
      {
        name: 'Monster Defense',
        description: 'Improved defensive capabilities',
        icon: '🛡️'
      },
      {
        name: 'Monster Spawning',
        description: 'Allows new monsters to join',
        icon: '🐾'
      }
    ],
    monster: true
  },
  'monster_hive': {
    name: "Monster Hive",
    description: "A place where monsters are born",
    type: "monster_hive",
    requiredResources: [
      { id: 'WOODEN_STICKS', quantity: 10 },
      { id: 'STONE_PIECES', quantity: 8 },
      { id: 'MONSTER_BLOOD', quantity: 3 }
    ],
    buildTime: 1,
    capacity: 15,
    durability: 150, // Increased from 80
    features: [
      {
        name: 'Monster Spawning',
        description: 'Allows new monsters to join',
        icon: '🐾'
      },
      {
        name: 'Rapid Growth',
        description: 'Monsters grow and reproduce quickly',
        icon: '⚡'
      }
    ],
    monster: true
  },
  'monster_den': {
    name: "Monster Den",
    description: "A hidden place for monsters to rest",
    type: "monster_den",
    requiredResources: [
      { id: 'WOODEN_STICKS', quantity: 12 },
      { id: 'STONE_PIECES', quantity: 8 },
      { id: 'BONE_FRAGMENT', quantity: 4 }
    ],
    buildTime: 1,
    capacity: 20,
    durability: 180, // Increased from 80
    features: [
      {
        name: 'Monster Healing',
        description: 'Monsters heal over time',
        icon: '❤️'
      },
      {
        name: 'Territory Control',
        description: 'Monsters defend their territory',
        icon: '🚧'
      }
    ],
    monster: true
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
      { id: 'WOODEN_STICKS', quantity: 5 },
      { id: 'STONE_PIECES', quantity: 3 }
    ],
    buildTime: 2,
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
      { id: 'WOODEN_STICKS', quantity: 8 },
      { id: 'STONE_PIECES', quantity: 5 }
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
      { id: 'WOODEN_STICKS', quantity: 6 },
      { id: 'STONE_PIECES', quantity: 2 },
      { id: 'MEDICINAL_HERBS', quantity: 4 } // Changed from "Fiber" to existing MEDICINAL_HERBS
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
      { id: 'WOODEN_STICKS', quantity: 10 },
      { id: 'STONE_PIECES', quantity: 8 },
      { id: 'IRON_ORE', quantity: 3 } // Changed from "Metal" to specific IRON_ORE
    ],
    buildTime: 5,
    features: [
      {
        name: 'Crafting',
        description: 'Allows crafting of items',
        icon: '🔨'
      }
    ]
  },
  
  'outpost': {
    name: 'Outpost',
    description: 'A forward base providing a foothold in new territories',
    type: 'outpost',
    durability: 200,
    sightRange: 3,
    bonuses: {
      defense: 2,
      detection: 1
    },
    requiredResources: [
      { id: 'WOODEN_STICKS', quantity: 12 },
      { id: 'STONE_PIECES', quantity: 8 },
      { id: 'IRON_ORE', quantity: 4 }
    ],
    buildTime: 4,
    capacity: 8,
    features: [
      {
        name: 'Forward Base',
        description: 'Allows establishing presence in new territories',
        icon: '🏕️'
      },
      {
        name: 'Extended Vision',
        description: 'Provides sight over surrounding area',
        icon: '👁️'
      },
      {
        name: 'Basic Storage',
        description: 'Stores resources and supplies',
        icon: '📦'
      }
    ]
  }
};

export const STRUCTURE_TYPES = Object.keys(STRUCTURES);
