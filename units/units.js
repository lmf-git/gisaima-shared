import UNITS from '../definitions/UNITS.js';
import { MONSTER_DROPS, ITEMS } from '../definitions/ITEMS.js';

export class Units {

  /**
   * Biome-specific monster preferences
   */
  static BIOME_MONSTER_WEIGHTS = {
    plains: { ork: 0.4, bandit: 0.3, wolf: 0.2, other: 0.1 },
    forest: { wolf: 0.3, spider: 0.3, bandit: 0.2, ork: 0.1, other: 0.1 },
    mountain: { troll: 0.3, ork: 0.3, skeleton: 0.2, other: 0.2 },
    desert: { skeleton: 0.4, bandit: 0.3, elemental: 0.2, other: 0.1 },
    swamp: { spider: 0.4, skeleton: 0.3, elemental: 0.2, other: 0.1 },
    tundra: { wolf: 0.4, elemental: 0.3, skeleton: 0.2, other: 0.1 },
    ruins: { skeleton: 0.5, ork: 0.2, bandit: 0.2, other: 0.1 },
    default: { ork: 0.25, wolf: 0.25, bandit: 0.2, spider: 0.2, other: 0.1 }
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
    if (!monster) return {};
    
    // Using object format with item codes as keys and quantities as values
    const items = {};
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
          
          // Generate quantity within range
          const minQty = itemTemplate.quantityRange[0];
          const maxQty = itemTemplate.quantityRange[1];
          const quantity = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
          
          // Use the item code as the key and quantity as the value
          const itemCode = itemTemplate.id.toUpperCase();
          items[itemCode] = (items[itemCode] || 0) + quantity;
        }
      }
    }
    
    return items;
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
   * Choose an appropriate monster type for a specific biome with terrain compatibility check
   * @param {string} biome - Biome name
   * @param {boolean} isWaterTile - Whether this is a water tile
   * @returns {string} - Selected monster type
   */
  static chooseMonsterTypeForBiome(biome, isWaterTile = false) {
    // Get all available monster types
    const monsterTypes = Object.keys(UNITS).filter(
      type => UNITS[type] && UNITS[type].category === 'monster'
    );
    
    // Filter monsters by terrain compatibility first
    let compatibleMonsters = monsterTypes.filter(type => {
      const monster = UNITS[type];
      
      if (isWaterTile) {
        // For water tiles, only use monsters that can traverse water
        return monster.motion && 
          (monster.motion.includes('water') || 
           monster.motion.includes('aquatic') || 
           monster.motion.includes('flying'));
      } else {
        // For land tiles, exclude monsters that can ONLY traverse water
        return !monster.motion || 
          monster.motion.length !== 1 || 
          (!monster.motion.includes('water') && !monster.motion.includes('aquatic'));
      }
    });
    
    // If no compatible monsters (shouldn't happen), use all monsters
    if (compatibleMonsters.length === 0) {
      compatibleMonsters = monsterTypes;
    }
    
    // First check for monsters with direct biome preference match
    const biomeMatches = compatibleMonsters.filter(type => 
      UNITS[type].biomePreference && 
      UNITS[type].biomePreference.includes(biome)
    );
    
    if (biomeMatches.length > 0) {
      // Return a random monster from those matching this biome
      return biomeMatches[Math.floor(Math.random() * biomeMatches.length)];
    }
    
    // For water tiles, always return water-compatible monsters
    if (isWaterTile) {
      const waterMonsters = ['merfolk', 'sea_serpent', 'shark', 'drowned'];
      const validWaterMonsters = waterMonsters.filter(type => 
        compatibleMonsters.includes(type)
      );
      
      if (validWaterMonsters.length > 0) {
        return validWaterMonsters[Math.floor(Math.random() * validWaterMonsters.length)];
      }
    }
    
    // For generic land terrain, select based on probability
    const weightedMonsters = compatibleMonsters.filter(type => 
      !UNITS[type].biomePreference || UNITS[type].biomePreference.length === 0
    );
    
    if (weightedMonsters.length > 0) {
      // Use probability weights for selection when no specific biome match
      const totalWeight = weightedMonsters.reduce((sum, type) => 
        sum + (UNITS[type].probability || 0.1), 0
      );
      
      let random = Math.random() * totalWeight;
      for (const type of weightedMonsters) {
        const weight = UNITS[type].probability || 0.1;
        random -= weight;
        if (random <= 0) {
          return type;
        }
      }
    }
    
    // Fallback to a random compatible monster
    return compatibleMonsters[Math.floor(Math.random() * compatibleMonsters.length)];
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