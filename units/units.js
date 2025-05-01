export class Units {
  /**
   * Player unit types with their properties
   * Used for recruitment and battle calculations
   */
  static PLAYER_UNITS = {
    // Basic units
    'basic_warrior': {
      name: 'Basic Warrior',
      description: "Basic melee fighter with sword and shield",
      type: 'warrior',
      power: 1,
      timePerUnit: 60, // seconds
      icon: 'sword',
      cost: { wood: 2, stone: 1 },
      requirements: {
        structureLevel: 1
      }
    },
    'scout': {
      name: 'Scout',
      description: "Fast unit with high visibility",
      type: 'scout',
      power: 0.5,
      timePerUnit: 45,
      icon: 'bow',
      cost: { wood: 1, leather: 1 },
      requirements: {
        structureLevel: 1
      }
    },
    
    // Race-specific units
    'human_knight': {
      name: 'Knight',
      description: "Heavily armored warrior with high defense",
      type: 'knight',
      power: 2,
      timePerUnit: 90,
      icon: 'shield',
      race: 'human',
      cost: { wood: 1, stone: 2, iron: 1 },
      requirements: {
        structureLevel: 2,
        race: 'human'
      }
    },
    'elf_archer': {
      name: 'Elven Archer',
      description: "Skilled ranged fighter with deadly accuracy",
      type: 'archer',
      power: 1.5,
      timePerUnit: 75,
      icon: 'bow',
      race: 'elf',
      cost: { wood: 3, leather: 1 },
      requirements: {
        structureLevel: 2,
        race: 'elf'
      }
    },
    'dwarf_defender': {
      name: 'Dwarven Defender',
      description: "Sturdy warrior specialized in defense",
      type: 'defender',
      power: 2,
      timePerUnit: 90,
      icon: 'shield',
      race: 'dwarf',
      cost: { stone: 2, iron: 2 },
      requirements: {
        structureLevel: 2,
        race: 'dwarf'
      }
    },
    'goblin_raider': {
      name: 'Goblin Raider',
      description: "Quick but weak fighter, good in groups",
      type: 'raider',
      power: 0.75,
      timePerUnit: 30,
      icon: 'sword',
      race: 'goblin',
      cost: { wood: 1 },
      requirements: {
        structureLevel: 2,
        race: 'goblin'
      }
    },
    'fairy_enchanter': {
      name: 'Fairy Enchanter',
      description: "Magical unit with support abilities",
      type: 'enchanter',
      power: 1.5,
      timePerUnit: 60,
      icon: 'staff',
      race: 'fairy',
      cost: { herbs: 2, crystal: 1 },
      requirements: {
        structureLevel: 2,
        race: 'fairy'
      }
    },
    
    // Elite units
    'elite_guard': {
      name: 'Elite Guard',
      description: "Highly trained soldier with advanced combat skills",
      type: 'elite',
      power: 3,
      timePerUnit: 120,
      icon: 'shield',
      cost: { wood: 2, stone: 2, iron: 2 },
      requirements: {
        structureType: ['fortress', 'stronghold'],
        structureLevel: 2
      }
    },
    'siege_ram': {
      name: 'Battering Ram',
      description: "Siege unit effective against structures",
      type: 'siege',
      power: 1.5,
      timePerUnit: 180,
      icon: 'shield',
      cost: { wood: 5, stone: 3, iron: 2 },
      requirements: {
        structureType: ['fortress', 'stronghold'],
        structureLevel: 3,
        research: 'siegecraft'
      }
    }
  };

  /**
   * Monster unit types with their properties
   * Used for monster spawning, merging, and battles
   */
  static MONSTER_UNITS = {
    goblin: { 
      probability: 0.3,
      name: "Goblin Raiders",
      description: "Small, crafty creatures that attack in groups",
      unitCountRange: [1, 4],
      itemChance: 0.6,
      mergeLimit: 8,
      power: 0.7,
      speed: 1.2,
      possibleItems: ['Wooden Sticks', 'Stolen Goods', 'Crude Weapon'],
      biomePreference: ['plains', 'forest']
    },
    wolf: { 
      probability: 0.2,
      name: "Wild Wolves",
      description: "Fast predators that hunt in packs",
      unitCountRange: [2, 5],
      itemChance: 0.4,
      mergeLimit: 10,
      power: 1.2,
      speed: 1.5,
      possibleItems: ['Wolf Meat', 'Wolf Pelt', 'Wolf Fang'],
      biomePreference: ['forest', 'tundra']
    },
    bandit: { 
      probability: 0.15,
      name: "Bandits",
      description: "Outlaw humans that prey on travelers",
      unitCountRange: [2, 4],
      itemChance: 0.8,
      mergeLimit: 6,
      power: 1.0,
      speed: 1.0,
      possibleItems: ['Ancient Coin', 'Crude Weapon', 'Leather Scraps'],
      biomePreference: ['plains', 'forest']
    },
    spider: { 
      probability: 0.15,
      name: "Giant Spiders",
      description: "Venomous arachnids that spin webs and hunt prey",
      unitCountRange: [1, 6],
      itemChance: 0.5,
      mergeLimit: 12,
      power: 0.9,
      speed: 1.2,
      possibleItems: ['Spider Silk', 'Venom Sac', 'Spider Eye'],
      biomePreference: ['forest', 'swamp']
    },
    skeleton: { 
      probability: 0.1,
      name: "Undead Skeletons",
      description: "Animated remains of fallen warriors",
      unitCountRange: [3, 7],
      itemChance: 0.7,
      mergeLimit: 15,
      power: 0.8,
      speed: 0.9,
      possibleItems: ['Bone Dust', 'Ancient Blade', 'Soul Essence'],
      biomePreference: ['desert', 'mountain', 'ruins']
    },
    troll: { 
      probability: 0.05,
      name: "Mountain Troll",
      description: "Massive, brutish creatures with regenerative abilities",
      unitCountRange: [1, 2],
      itemChance: 0.9,
      mergeLimit: 3,
      power: 2.5,
      speed: 0.7,
      possibleItems: ['Troll Hide', 'Troll Club', 'Troll Tooth'],
      biomePreference: ['mountain', 'hills']
    },
    elemental: { 
      probability: 0.05,
      name: "Wild Elemental",
      description: "Magical manifestations of natural forces",
      unitCountRange: [1, 3],
      itemChance: 0.8,
      mergeLimit: 5,
      power: 2.0,
      speed: 1.0,
      possibleItems: ['Elemental Essence', 'Shiny Gem', 'Magical Residue'],
      biomePreference: ['tundra', 'desert', 'swamp']
    }
  };

  /**
   * Biome-specific monster preferences
   */
  static BIOME_MONSTER_WEIGHTS = {
    plains: { goblin: 0.4, bandit: 0.3, wolf: 0.2, other: 0.1 },
    forest: { wolf: 0.3, spider: 0.3, bandit: 0.2, goblin: 0.1, other: 0.1 },
    mountain: { troll: 0.3, goblin: 0.3, skeleton: 0.2, other: 0.2 },
    desert: { skeleton: 0.4, bandit: 0.3, elemental: 0.2, other: 0.1 },
    swamp: { spider: 0.4, skeleton: 0.3, elemental: 0.2, other: 0.1 },
    tundra: { wolf: 0.4, elemental: 0.3, skeleton: 0.2, other: 0.1 },
    ruins: { skeleton: 0.5, goblin: 0.2, bandit: 0.2, other: 0.1 },
    default: { goblin: 0.25, wolf: 0.25, bandit: 0.2, spider: 0.2, other: 0.1 }
  };

  /**
   * Item drops for monsters
   */
  static MONSTER_ITEMS = {
    common: [
      { name: "Wooden Sticks", type: "resource", quantityRange: [1, 5] },
      { name: "Stone Pieces", type: "resource", quantityRange: [1, 4] },
      { name: "Bone Fragment", type: "resource", quantityRange: [1, 3] },
      { name: "Crude Weapon", type: "weapon", quantityRange: [1, 1] }
    ],
    uncommon: [
      { name: "Monster Hide", type: "resource", quantityRange: [1, 2] },
      { name: "Ancient Coin", type: "treasure", quantityRange: [1, 3] },
      { name: "Monster Tooth", type: "trophy", quantityRange: [1, 2] },
      { name: "Mysterious Herb", type: "alchemy", quantityRange: [1, 2] }
    ],
    rare: [
      { name: "Shiny Gem", type: "gem", quantityRange: [1, 1] },
      { name: "Monster Blood", type: "alchemy", quantityRange: [1, 2] },
      { name: "Rare Metals", type: "resource", quantityRange: [1, 2] }
    ],
    epic: [
      { name: "Primal Essence", type: "gem", quantityRange: [1, 1] },
      { name: "Legendary Fragment", type: "treasure", quantityRange: [1, 1] }
    ]
  };

  /**
   * Get a player unit by its ID
   * @param {string} unitId - ID of the unit
   * @returns {object|null} Unit data or null if not found
   */
  static getPlayerUnit(unitId) {
    return Units.PLAYER_UNITS[unitId] || null;
  }

  /**
   * Get a monster unit by its type
   * @param {string} monsterType - Type of monster
   * @returns {object|null} Monster data or null if not found
   */
  static getMonsterUnit(monsterType) {
    return Units.MONSTER_UNITS[monsterType] || null;
  }

  /**
   * Calculate a monster's combat power based on type and count
   * @param {string} monsterType - Type of monster
   * @param {number} unitCount - Number of monster units
   * @param {boolean} isMixed - Whether this is a mixed monster group
   * @param {number} mergeCount - How many times the monster has merged
   * @returns {number} Total combat power
   */
  static calculateMonsterPower(monsterType, unitCount = 1, isMixed = false, mergeCount = 0) {
    const monster = Units.getMonsterUnit(monsterType);
    if (!monster) return unitCount; // Default 1 power per unit
    
    // Base power calculation
    let basePower = monster.power * unitCount;
    
    // Apply merge bonus
    const mergeBonus = mergeCount ? (mergeCount * 0.2) : 0;
    basePower *= (1 + mergeBonus);
    
    // Mixed monsters get a synergy bonus
    if (isMixed) {
      basePower *= 1.15;  // 15% bonus for mixed groups
    }
    
    return Math.round(basePower * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Calculate a player unit's combat power
   * @param {string} unitType - Type of unit
   * @param {number} quantity - Number of units
   * @param {object} modifiers - Additional modifiers (equipment, etc.)
   * @returns {number} Total combat power
   */
  static calculatePlayerUnitPower(unitType, quantity = 1, modifiers = {}) {
    const unit = Units.getPlayerUnit(unitType);
    if (!unit) return quantity; // Default 1 power per unit
    
    // Base power calculation
    let basePower = unit.power * quantity;
    
    // Apply equipment/training modifiers if present
    if (modifiers.equipment) basePower *= (1 + modifiers.equipment * 0.1);
    if (modifiers.training) basePower *= (1 + modifiers.training * 0.15);
    if (modifiers.leadership) basePower *= (1 + modifiers.leadership * 0.2);
    
    return Math.round(basePower * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Generate random monster items based on monster type and unit count
   * @param {string} monsterType - Type of monster
   * @param {number} unitCount - Number of monster units
   * @returns {Array} Array of generated items
   */
  static generateMonsterItems(monsterType, unitCount = 1) {
    const monster = Units.getMonsterUnit(monsterType);
    if (!monster) return [];
    
    const items = [];
    // Calculate how many items to generate (more units = more items)
    const itemCount = Math.min(Math.ceil(unitCount / 2), 3);
    
    for (let i = 0; i < itemCount; i++) {
      // Only add item if we pass the chance check
      if (Math.random() < monster.itemChance) {
        // Determine rarity with weighted probabilities
        const rarityRoll = Math.random();
        let rarity;
        
        if (rarityRoll > 0.98) {
          rarity = 'epic';
        } else if (rarityRoll > 0.90) {
          rarity = 'rare';
        } else if (rarityRoll > 0.70) {
          rarity = 'uncommon';
        } else {
          rarity = 'common';
        }
        
        // Get items for that rarity
        const possibleItems = Units.MONSTER_ITEMS[rarity];
        if (possibleItems && possibleItems.length > 0) {
          const itemTemplate = possibleItems[Math.floor(Math.random() * possibleItems.length)];
          
          // Generate quantity within range
          const minQty = itemTemplate.quantityRange[0];
          const maxQty = itemTemplate.quantityRange[1];
          const quantity = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
          
          items.push({
            id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            name: itemTemplate.name,
            type: itemTemplate.type,
            rarity,
            quantity
          });
        }
      }
    }
    
    return items;
  }

  /**
   * Choose a monster type appropriate for a biome
   * @param {string} biome - Biome type
   * @returns {string} Selected monster type
   */
  static chooseMonsterTypeForBiome(biome = 'default') {
    const weights = Units.BIOME_MONSTER_WEIGHTS[biome] || Units.BIOME_MONSTER_WEIGHTS.default;
    
    // Convert weights to a probability distribution
    const distribution = [];
    for (const [monsterType, weight] of Object.entries(weights)) {
      if (monsterType === 'other') continue;
      
      // Add entries to distribution based on weight
      for (let i = 0; i < weight * 100; i++) {
        distribution.push(monsterType);
      }
    }
    
    // If distribution is somehow empty, use fallbacks
    if (distribution.length === 0) {
      return Object.keys(Units.MONSTER_UNITS)[0];
    }
    
    // Pick randomly from distribution
    return distribution[Math.floor(Math.random() * distribution.length)];
  }

  /**
   * Get appropriate monster name based on type and count
   * @param {string} monsterType - Type of monster
   * @param {number} unitCount - Number of units
   * @returns {string} Descriptive monster group name
   */
  static getMonsterGroupName(monsterType, unitCount) {
    const monster = Units.getMonsterUnit(monsterType);
    if (!monster) return 'Monster Group';
    
    const baseName = monster.name;
    
    // Different names based on size
    if (unitCount <= 2) {
      return `Small ${baseName}`;
    } else if (unitCount <= 5) {
      return baseName;
    } else if (unitCount <= 8) {
      return `${baseName} Warband`;
    } else if (unitCount <= 12) {
      return `${baseName} Horde`;
    } else {
      return `Massive ${baseName} Legion`;
    }
  }

  /**
   * Generate a name for a mixed monster group
   * @param {Object} composition - Composition of monster types
   * @param {number} totalUnits - Total unit count
   * @returns {string} Group name
   */
  static getMixedMonsterGroupName(composition, totalUnits) {
    // Get the top two types by count
    const sortedTypes = Object.entries(composition)
      .sort(([,a], [,b]) => b - a)
      .map(([type]) => type);
    
    let prefix, suffix;
    
    // Determine size prefix
    if (totalUnits <= 4) {
      prefix = "Small";
    } else if (totalUnits <= 8) {
      prefix = "";
    } else if (totalUnits <= 12) {
      prefix = "Large";
    } else {
      prefix = "Massive";
    }
    
    // Determine group type suffix
    if (totalUnits <= 4) {
      suffix = "Band";
    } else if (totalUnits <= 8) {
      suffix = "Pack";
    } else if (totalUnits <= 12) {
      suffix = "Horde";
    } else {
      suffix = "Legion";
    }
    
    // Format name based on composition complexity
    if (Object.keys(composition).length > 2) {
      return `${prefix} Mixed Monster ${suffix}`.trim();
    } else {
      // Get display names for the top types
      const typeNames = sortedTypes.slice(0, 2).map(type => {
        const monster = Units.getMonsterUnit(type);
        return monster ? monster.name.split(' ')[0] : Units.capitalizeFirstLetter(type);
      });
      
      return `${prefix} ${typeNames.join('-')} ${suffix}`.trim();
    }
  }
  
  /**
   * Helper function to capitalize first letter
   * @private
   */
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  /**
   * Get available player units for a structure
   * @param {object} structure - Structure data
   * @returns {Array} Array of available units with availability info
   */
  static getAvailableUnits(structure) {
    if (!structure) return [];
    
    const race = structure?.race?.toLowerCase();
    const structureLevel = structure?.level || 1;
    
    // Get all player units
    const allUnits = Object.entries(Units.PLAYER_UNITS).map(([id, data]) => ({
      id,
      ...data
    }));
    
    // Process each unit to determine availability
    return allUnits.map(unit => {
      // Check requirements
      let available = true;
      let unavailableReason = "";
      
      // Structure level check
      if (unit.requirements?.structureLevel > structureLevel) {
        available = false;
        unavailableReason = `Requires structure level ${unit.requirements.structureLevel}`;
      }
      
      // Race check
      if (unit.requirements?.race && unit.requirements.race !== race) {
        available = false;
        unavailableReason = `Requires ${Units.capitalizeFirstLetter(unit.requirements.race)} structure`;
      }
      
      // Structure type check
      if (unit.requirements?.structureType && 
          !unit.requirements.structureType.includes(structure.type)) {
        available = false;
        unavailableReason = `Requires ${Units.formatStructureTypeName(unit.requirements.structureType[0])}`;
      }
      
      // Research check
      if (unit.requirements?.research) {
        // Assuming we need to check if research is completed
        const researchCompleted = structure.research && 
          structure.research[unit.requirements.research];
        if (!researchCompleted) {
          available = false;
          unavailableReason = `Requires ${Units.formatResearchName(unit.requirements.research)} research`;
        }
      }
      
      // Return modified copy of the unit with availability info
      return {
        ...unit,
        available,
        unavailableReason
      };
    });
  }
  
  /**
   * Format structure type name for display
   * @param {string} type - Structure type
   * @returns {string} Formatted name
   */
  static formatStructureTypeName(type) {
    if (!type) return "";
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  
  /**
   * Format research name for display
   * @param {string} research - Research ID
   * @returns {string} Formatted name
   */
  static formatResearchName(research) {
    if (!research) return "";
    return research.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}