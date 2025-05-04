// Define item categories with display labels
export const ITEM_CATEGORIES = {
  weapon: 'Weapons',
  tool: 'Tools',
  consumable: 'Consumables',
  document: 'Documents',
  artifact: 'Artifacts',
  material: 'Materials',
  scroll: 'Scrolls',
  trade_good: 'Trade Goods'
};

// Add a helper function to get categories formatted for display
export function getItemCategories() {
  return Object.entries(ITEM_CATEGORIES).map(([id, label]) => ({ id, label }));
}

export const ITEMS = {
  // Common resources (gathered items)
  WOODEN_STICKS: {
    name: 'Wooden Sticks',
    type: 'resource',
    rarity: 'common',
    description: 'Basic building material found in most areas',
    biomes: ['plains', 'forest', 'mountains', 'desert', 'rivers', 'oasis', 'ruins', 'wastes']
  },
  STONE_PIECES: {
    name: 'Stone Pieces',
    type: 'resource',
    rarity: 'common',
    description: 'Small rocks useful for crafting tools',
    biomes: ['plains', 'forest', 'mountains', 'desert', 'ruins', 'wastes']
  },

  LEATHER: {
    name: 'Leather',
    type: 'resource',
    rarity: 'common',
    description: 'Tough hide used in crafting armor and goods'
  },
  
  // Craftable items
  WOODEN_SWORD: {
    name: 'Wooden Sword',
    type: 'weapon',
    rarity: 'common',
    description: 'A basic wooden sword. Not very durable but better than nothing.',
    power: 2, // Battle power contribution
    recipe: {
      materials: {
        WOODEN_STICKS: 5
      },
      ticksRequired: 6,
      category: 'weapon',
      requiredLevel: 1
    }
  },
  
  STONE_SWORD: {
    name: 'Stone Sword',
    type: 'weapon',
    rarity: 'common',
    description: 'A stone-bladed sword. More durable than wood.',
    power: 5, // Battle power contribution
    recipe: {
      materials: {
        WOODEN_STICKS: 2,
        STONE_PIECES: 5
      },
      ticksRequired: 12,
      category: 'weapon',
      requiredLevel: 2
    }
  },
  HERBS: {
    name: 'Herbs',
    type: 'resource',
    rarity: 'common',
    description: 'Plants used for potions and healing'
  },
  CRYSTAL: {
    name: 'Crystal',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Magical shard used for enchantments'
  },
  IRON: {
    name: 'Iron',
    type: 'resource',
    rarity: 'common',
    description: 'Strong metal used for weapons and tools'
  },
  IRON_SWORD: {
    name: 'Iron Sword',
    type: 'weapon',
    rarity: 'uncommon',
    description: 'A well-crafted iron sword. Standard issue for many fighters.',
    power: 10, // Battle power contribution
    recipe: {
      materials: {
        WOODEN_STICKS: 2,
        IRON_ORE: 3
      },
      ticksRequired: 18,
      category: 'weapon',
      requiredLevel: 3,
      requiredBuilding: {
        type: 'smithy',
        level: 2
      }
    }
  },
  
  HERBAL_TEA: {
    name: 'Herbal Tea',
    type: 'consumable',
    rarity: 'common',
    description: 'A soothing tea that provides minor healing and stamina recovery.',
    recipe: {
      materials: {
        MEDICINAL_HERBS: 2,
        FRESH_WATER: 1
      },
      ticksRequired: 4,
      category: 'consumable',
      requiredLevel: 1,
      requiredBuilding: {
        type: 'farm',
        level: 1
      },
      quantity: 2  // Produces 2 per craft
    }
  },
  
  // Special items
  MYSTERIOUS_ARTIFACT: {
    name: 'Mysterious Artifact',
    type: 'artifact',
    rarity: 'rare',
    description: 'A strange object of unknown origin',
    power: 8, // Battle power contribution
    biomes: ['ruins', 'wastes'] // Special item found in specific areas
  },
  
  // Plains items
  WHEAT: {
    name: 'Wheat',
    type: 'resource',
    rarity: 'common',
    description: 'Grain that grows in open grasslands',
    biomes: ['plains']
  },
  WILD_BERRIES: {
    name: 'Wild Berries',
    type: 'resource',
    rarity: 'common',
    description: 'Edible berries found in meadows',
    biomes: ['plains', 'forest']
  },
  
  // Forest items
  OAK_WOOD: {
    name: 'Oak Wood',
    type: 'resource',
    rarity: 'common',
    description: 'Strong wood from forest trees',
    biomes: ['forest']
  },
  MEDICINAL_HERBS: {
    name: 'Medicinal Herbs',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Plants with healing properties',
    biomes: ['forest']
  },
  
  // Mountain items
  IRON_ORE: {
    name: 'Iron Ore',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Metal-bearing rock found in mountains',
    biomes: ['mountains']
  },
  MOUNTAIN_CRYSTAL: {
    name: 'Mountain Crystal',
    type: 'gem',
    rarity: 'rare',
    description: 'Beautiful crystal formed deep within mountains',
    biomes: ['mountains']
  },
  
  // Desert items
  SAND_CRYSTAL: {
    name: 'Sand Crystal',
    type: 'gem',
    rarity: 'uncommon',
    description: 'Formed from heated desert sands',
    biomes: ['desert']
  },
  CACTUS_FRUIT: {
    name: 'Cactus Fruit',
    type: 'resource',
    rarity: 'common',
    description: 'Juicy fruit that grows on desert cacti',
    biomes: ['desert']
  },
  
  // River items
  FRESH_WATER: {
    name: 'Fresh Water',
    type: 'resource',
    rarity: 'common',
    description: 'Clean water from flowing rivers',
    biomes: ['rivers']
  },
  FISH: {
    name: 'Fish',
    type: 'resource',
    rarity: 'common',
    description: 'Freshwater fish from rivers and lakes',
    biomes: ['rivers']
  },
  
  // Oasis items
  PURE_WATER: {
    name: 'Pure Water',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Exceptionally clean water from oasis springs',
    biomes: ['oasis']
  },
  EXOTIC_FRUIT: {
    name: 'Exotic Fruit',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Rare fruits growing around water sources in dry areas',
    biomes: ['oasis']
  },
  
  // Ruins items
  ANCIENT_FRAGMENT: {
    name: 'Ancient Fragment',
    type: 'artifact',
    rarity: 'rare',
    description: 'Piece of a forgotten civilization',
    biomes: ['ruins']
  },
  BROKEN_TOOL: {
    name: 'Broken Tool',
    type: 'junk',
    rarity: 'common',
    description: 'Damaged tool from a bygone era',
    biomes: ['ruins']
  },
  
  // Wasteland items
  SCRAP_METAL: {
    name: 'Scrap Metal',
    type: 'resource',
    rarity: 'common',
    description: 'Salvageable metal pieces',
    biomes: ['wastes']
  },
  STRANGE_DEVICE: {
    name: 'Strange Device',
    type: 'artifact',
    rarity: 'uncommon',
    description: 'Peculiar machinery with unknown purpose',
    biomes: ['wastes']
  },

  // New monster drop items
  BONE_FRAGMENT: {
    name: 'Bone Fragment',
    type: 'resource',
    rarity: 'common',
    description: 'A fragment of bone from a defeated monster',
    monsterDrop: true
  },
  CRUDE_WEAPON: {
    name: 'Crude Weapon',
    type: 'weapon',
    rarity: 'common',
    description: 'A simple weapon dropped by a monster',
    power: 3, // Battle power contribution
    monsterDrop: true
  },
  MONSTER_HIDE: {
    name: 'Monster Hide',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Tough hide from a monster',
    monsterDrop: true
  },
  ANCIENT_COIN: {
    name: 'Ancient Coin',
    type: 'treasure',
    rarity: 'uncommon',
    description: 'Old coin from a forgotten civilization',
    monsterDrop: true
  },
  MONSTER_TOOTH: {
    name: 'Monster Tooth',
    type: 'trophy',
    rarity: 'uncommon',
    description: 'Sharp tooth taken from a slain creature',
    power: 2, // Battle power contribution
    monsterDrop: true
  },
  MONSTER_BLOOD: {
    name: 'Monster Blood',
    type: 'alchemy',
    rarity: 'rare',
    description: 'Unusual blood with magical properties',
    monsterDrop: true
  },
  RARE_METALS: {
    name: 'Rare Metals',
    type: 'resource',
    rarity: 'rare',
    description: 'Uncommon metal fragments with special properties',
    monsterDrop: true
  },
  PRIMAL_ESSENCE: {
    name: 'Primal Essence',
    type: 'gem',
    rarity: 'epic',
    description: 'Crystallized magical energy from a powerful creature',
    power: 15, // Battle power contribution
    monsterDrop: true
  }
};

// Monster drop items organized by rarity tiers
export const MONSTER_DROPS = {
  common: [
    { id: "WOODEN_STICKS", quantityRange: [1, 5] },
    { id: "STONE_PIECES", quantityRange: [1, 4] },
    { id: "BONE_FRAGMENT", quantityRange: [1, 3] },
    { id: "CRUDE_WEAPON", quantityRange: [1, 1] }
  ],
  uncommon: [
    { id: "MONSTER_HIDE", quantityRange: [1, 2] },
    { id: "ANCIENT_COIN", quantityRange: [1, 3] },
    { id: "MONSTER_TOOTH", quantityRange: [1, 2] },
    { id: "MEDICINAL_HERBS", quantityRange: [1, 2] }  // Reuse existing item
  ],
  rare: [
    { id: "MOUNTAIN_CRYSTAL", quantityRange: [1, 1] }, // Reuse existing gem
    { id: "MONSTER_BLOOD", quantityRange: [1, 2] },
    { id: "RARE_METALS", quantityRange: [1, 2] }
  ],
  epic: [
    { id: "PRIMAL_ESSENCE", quantityRange: [1, 1] },
    { id: "ANCIENT_FRAGMENT", quantityRange: [1, 1] }  // Reuse existing artifact
  ]
};

// Helper function to get all craftable recipes
export function getAllRecipes() {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.recipe)
    .map(([itemId, item]) => ({
      id: itemId.toLowerCase(),  // lowercase ID for recipe reference
      name: item.name,
      category: item.recipe.category,
      materials: item.recipe.materials,
      result: {
        id: itemId,
        ...item,
        quantity: item.recipe.quantity || 1
      },
      ticksRequired: item.recipe.ticksRequired,
      requiredLevel: item.recipe.requiredLevel,
      requiredBuilding: item.recipe.requiredBuilding
    }));
}

// Helper to get recipes by category
export function getRecipesByCategory(category) {
  return getAllRecipes().filter(recipe => recipe.category === category);
}

// Helper to find a recipe by ID
export function getRecipeById(recipeId) {
  return getAllRecipes().find(recipe => recipe.id === recipeId);
}

// Helper to check if player can craft a recipe
export function canCraftRecipe(recipeId, inventory, buildingLevels = {}) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return false;
  
  // Check materials
  const hasMaterials = Object.entries(recipe.materials).every(([itemId, requiredQty]) => {
    const item = inventory.find(invItem => invItem.id === itemId);
    return item && item.quantity >= requiredQty;
  });
  
  // Check building requirements
  const meetsBuilding = !recipe.requiredBuilding || 
    (buildingLevels[recipe.requiredBuilding.type] >= recipe.requiredBuilding.level);
  
  return hasMaterials && meetsBuilding;
}

// Retain the biome item function
export function getBiomeItems(biomeName) {
  // Default to plains if biome not found
  const validBiome = ['plains', 'forest', 'mountains', 'desert', 'rivers', 'oasis', 'ruins', 'wastes'].includes(biomeName) 
    ? biomeName 
    : 'plains';
  
  // Filter items that belong to this biome
  const biomeItems = Object.entries(ITEMS)
    .filter(([_, item]) => item.biomes && item.biomes.includes(validBiome))
    .map(([id, item]) => ({
      id,
      ...item,
      quantity: Math.floor(Math.random() * (item.rarity === 'common' ? 3 : 2)) + 1
    }));
  
  return biomeItems;
}

// New helper function to get item power contribution
export function getItemPower(itemId) {
  const item = ITEMS[itemId];
  return item && item.power ? item.power : 0;
}