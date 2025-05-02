import UNITS from '../definitions/UNITS.js';
import { MONSTER_DROPS, ITEMS } from '../definitions/items.js';

export class Units {

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
   * Get a unit by its ID
   * @param {string} unitId - ID of the unit
   * @param {string} [category] - Optional filter by category ('player' or 'monster')
   * @returns {object|null} Unit data or null if not found
   */
  static getUnit(unitId, category = null) {
    const unit = UNITS[unitId];
    
    if (!unit) return null;
    if (category && unit.category !== category) return null;
    
    return unit;
  }

  /**
   * Calculate a unit's combat power based on unit ID and count
   * @param {string} unitId - ID of the unit
   * @param {number} qty - Number of units
   * @param {object} options - Additional options (isMixed, mergeCount, modifiers)
   * @returns {number} Total combat power
   */
  static calculateUnitPower(unitId, qty = 1, options = {}) {
    const unit = Units.getUnit(unitId);
    if (!unit) return qty; // Default 1 power per unit
    
    // Base power calculation
    let basePower = unit.power * qty;
    
    if (unit.category === 'monster') {
      // Apply monster-specific bonuses
      if (options.mergeCount) {
        const mergeBonus = options.mergeCount * 0.2;
        basePower *= (1 + mergeBonus);
      }
      
      if (options.isMixed) {
        basePower *= 1.15;  // 15% bonus for mixed groups
      }
    } else {
      // Apply player unit bonuses
      if (options.modifiers) {
        if (options.modifiers.equipment) basePower *= (1 + options.modifiers.equipment * 0.1);
        if (options.modifiers.training) basePower *= (1 + options.modifiers.training * 0.15);
        if (options.modifiers.leadership) basePower *= (1 + options.modifiers.leadership * 0.2);
      }
    }
    
    return Math.round(basePower * 10) / 10; // Round to 1 decimal place
  }
  

  /**
   * Generate items based on unit ID and count
   * @param {string} unitId - ID of the unit
   * @param {number} unitQty - Number of units
   * @returns {Array} Array of generated items
   */
  static generateItems(unitId, unitQty = 1) {
    const unit = Units.getUnit(unitId);
    if (!unit) return [];
    
    // Currently only monsters generate items
    if (unit.category === 'monster') {
      return Units.generateMonsterItemsInternal(unitId, unitQty);
    }
    
    // Could implement player item generation here
    return [];
  }

  /**
   * Internal method for monster item generation
   * @private
   */
  static generateMonsterItemsInternal(monsterId, unitQty = 1) {
    const monster = Units.getUnit(monsterId, 'monster');
    if (!monster) return [];
    
    const items = [];
    const itemCount = Math.min(Math.ceil(unitQty / 2), 3);
    
    for (let i = 0; i < itemCount; i++) {
      if (Math.random() < monster.itemChance) {
        // Determine rarity tier
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
        
        // Get items for that rarity from shared MONSTER_DROPS
        const possibleItems = MONSTER_DROPS[rarity];
        if (possibleItems && possibleItems.length > 0) {
          const itemTemplate = possibleItems[Math.floor(Math.random() * possibleItems.length)];
          
          // Get the item definition from the shared ITEMS
          const itemDefinition = ITEMS[itemTemplate.id] || {
            name: itemTemplate.id,
            type: 'unknown',
            rarity: rarity
          };
          
          // Generate quantity within range
          const minQty = itemTemplate.quantityRange[0];
          const maxQty = itemTemplate.quantityRange[1];
          const quantity = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
          
          items.push({
            id: itemTemplate.id,
            name: itemDefinition.name,
            type: itemDefinition.type,
            rarity: itemDefinition.rarity,
            quantity
          });
        }
      }
    }
    
    return items;
  }
  
  /**
   * For backward compatibility
   * @deprecated Use generateItems instead
   */
  static generateMonsterItems(monsterType, unitQty = 1) {
    return Units.generateItems(monsterType, unitQty);
  }

  /**
   * Get appropriate group name based on unit ID and count
   * @param {string} unitId - ID of the unit
   * @param {number} unitQty - Number of units
   * @param {object} options - Additional options for mixed groups
   * @returns {string} Descriptive unit group name
   */
  static getUnitGroupName(unitId, unitQty, options = {}) {
    const unit = Units.getUnit(unitId);
    if (!unit) return 'Unknown Group';
    
    if (unit.category === 'monster') {
      if (options.composition) {
        return Units.getMixedMonsterGroupName(options.composition, unitQty);
      }
      return Units.getMonsterGroupNameInternal(unitId, unitQty);
    }
    
    // Player unit group naming
    if (unitQty <= 1) {
      return unit.name;
    } else {
      return `${unit.name} Group (${unitQty})`;
    }
  }

  /**
   * Internal method for monster group naming
   * @private
   */
  static getMonsterGroupNameInternal(monsterId, unitQty) {
    const monster = Units.getUnit(monsterId, 'monster');
    if (!monster) return 'Monster Group';
    
    const baseName = monster.name;
    
    // Different names based on size
    if (unitQty <= 2) {
      return `Small ${baseName}`;
    } else if (unitQty <= 5) {
      return baseName;
    } else if (unitQty <= 8) {
      return `${baseName} Warband`;
    } else if (unitQty <= 12) {
      return `${baseName} Horde`;
    } else {
      return `Massive ${baseName} Legion`;
    }
  }

  /**
   * For backward compatibility
   * @deprecated Use getUnitGroupName instead
   */
  static getMonsterGroupName(monsterType, unitQty) {
    return Units.getUnitGroupName(monsterType, unitQty);
  }

  /**
   * Choose an appropriate monster unit for a biome
   * @param {string} biome - Biome name
   * @returns {string} Chosen unit ID
   */
  static chooseMonsterTypeForBiome(biome = 'default') {
    const weights = Units.BIOME_MONSTER_WEIGHTS[biome] || Units.BIOME_MONSTER_WEIGHTS.default;
    
    // Filter for units in our unified system
    const monsterUnits = Object.keys(UNITS).filter(id => 
      UNITS[id].category === 'monster' && weights[id]
    );
    
    if (monsterUnits.length === 0) {
      // Fallback to any monster unit
      const anyMonsterUnits = Object.keys(UNITS).filter(id => 
        UNITS[id].category === 'monster'
      );
      return anyMonsterUnits[Math.floor(Math.random() * anyMonsterUnits.length)];
    }
    
    // Build weighted distribution
    const distribution = [];
    for (const unitId of monsterUnits) {
      const weight = weights[unitId] || 0.1; // Default to 0.1 weight if not specified
      
      // Add entries to distribution based on weight
      for (let i = 0; i < weight * 100; i++) {
        distribution.push(unitId);
      }
    }
    
    // Pick randomly from distribution
    return distribution[Math.floor(Math.random() * distribution.length)];
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
        const monster = Units.getUnit(type, 'monster');
        return monster ? monster.name.split(' ')[0] : Units.capitalizeFirstLetter(type);
      });
      
      return `${prefix} ${typeNames.join('-')} ${suffix}`.trim();
    }
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
    
    // Get all player units from unified UNITS collection
    const allUnits = Object.entries(UNITS)
      .filter(([_, data]) => data.category === 'player')
      .map(([id, data]) => ({
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
  
  /**
   * Helper function to capitalize first letter
   * @private
   */
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}