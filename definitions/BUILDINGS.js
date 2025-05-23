export const BUILDINGS = {
  // Building type definitions
  types: {
    smithy: {
      name: "Smithy",
      description: "A place to craft weapons, tools and metal armor. Higher levels enable advanced smithing recipes.",
      icon: "⚒️",
      upgradeTimeMultiplier: 1.2,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 10 },
        { name: 'Stone Pieces', quantity: 15 },
        { name: 'Iron Ore', quantity: 5 }
      ]
    },
    barracks: {
      name: "Barracks",
      description: "Train and house troops here. Higher levels allow training more advanced units.",
      icon: "🛡️",
      upgradeTimeMultiplier: 1.5,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 15 },
        { name: 'Stone Pieces', quantity: 10 }
      ]
    },
    mine: {
      name: "Mine",
      description: "Extract minerals and resources. Higher levels yield better resources and improved mining efficiency.",
      icon: "⛏️",
      upgradeTimeMultiplier: 1.3,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 8 },
        { name: 'Stone Pieces', quantity: 20 }
      ]
    },
    wall: {
      name: "Defensive Wall",
      description: "Defensive structure that improves settlement security. Higher levels increase defensive capabilities.",
      icon: "🧱",
      upgradeTimeMultiplier: 0.8,
      baseRequirements: [
        { name: 'Stone Pieces', quantity: 25 }
      ]
    },
    academy: {
      name: "Academy",
      description: "Research new technologies and spells. Higher levels unlock advanced research options.",
      icon: "📚",
      upgradeTimeMultiplier: 1.4,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 12 },
        { name: 'Stone Pieces', quantity: 8 }
      ]
    },
    market: {
      name: "Market",
      description: "Trade goods with others. Higher levels improve trade rates and available items.",
      icon: "💰",
      upgradeTimeMultiplier: 1.0,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 15 },
        { name: 'Stone Pieces', quantity: 5 }
      ]
    },
    farm: {
      name: "Farm",
      description: "Produce food and plant resources. Higher levels increase crop yields and enable rare plants.",
      icon: "🌾",
      upgradeTimeMultiplier: 0.9,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 10 },
        { name: 'Seeds', quantity: 5 }
      ]
    },
    
    // Add the new harbor building type
    harbour: {
      name: "Harbor",
      description: "A port facility for constructing and launching water vessels. Higher levels enable more advanced ships.",
      icon: "⚓",
      upgradeTimeMultiplier: 1.4,
      waterRequired: true, // This building requires a water tile adjacent
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 20 },
        { name: 'Stone Pieces', quantity: 15 },
        { name: 'Rope', quantity: 8 }
      ]
    },
    
    // Monster building types
    monster_nest: {
      name: "Monster Nest",
      description: "A crude nesting area that provides shelter for weaker monsters",
      icon: "🪹",
      upgradeTimeMultiplier: 0.8,
      monster: true,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 5 },
        { name: 'Stone Pieces', quantity: 3 }
      ]
    },
    monster_forge: {
      name: "Monster Forge",
      description: "A primitive forge used by more advanced monster groups to craft crude weapons",
      icon: "🔥",
      upgradeTimeMultiplier: 1.2,
      monster: true,
      baseRequirements: [
        { name: 'Stone Pieces', quantity: 10 },
        { name: 'Iron Ore', quantity: 3 }
      ]
    },
    monster_totem: {
      name: "Monster Totem",
      description: "A ritual structure that enhances monster abilities",
      icon: "🗿",
      upgradeTimeMultiplier: 1.5,
      monster: true,
      baseRequirements: [
        { name: 'Wooden Sticks', quantity: 8 },
        { name: 'Stone Pieces', quantity: 4 },
        { name: 'Crystal Shard', quantity: 1 }
      ]
    }
  },
  
  // Level-specific benefits for each building type
  benefits: {
    smithy: {
      2: [
        {
          name: 'Basic Smithing',
          description: 'Allows crafting metal tools',
          bonus: { craftingSpeed: 0.1 }
        }
      ],
      3: [
        {
          name: 'Advanced Smithing',
          description: 'Allows crafting advanced weapons',
          unlocks: ['iron_sword', 'iron_pickaxe']
        }
      ],
      4: [
        {
          name: 'Expert Smithing',
          description: 'Allows crafting expert-level equipment',
          unlocks: ['steel_sword', 'steel_armor']
        }
      ],
      5: [
        {
          name: 'Master Smithing',
          description: 'Allows crafting legendary items',
          unlocks: ['legendary_weapon']
        }
      ]
    },
    barracks: {
      2: [
        {
          name: 'Basic Training',
          description: 'Allows training of basic soldiers',
          unlocks: ['recruit_soldier']
        }
      ],
      3: [
        {
          name: 'Advanced Training',
          description: 'Allows training of skilled units',
          unlocks: ['skilled_soldier', 'archer']
        }
      ],
      4: [
        {
          name: 'Elite Training',
          description: 'Allows training of elite units',
          unlocks: ['elite_soldier', 'cavalry']
        }
      ],
      5: [
        {
          name: 'Legendary Training',
          description: 'Allows training of legendary units',
          unlocks: ['champion', 'royal_guard']
        }
      ]
    },
    mine: {
      2: [
        {
          name: 'Efficient Mining',
          description: 'Improves mining yields by 10%',
          bonus: { miningYield: 0.1 }
        }
      ],
      3: [
        {
          name: 'Deep Mining',
          description: 'Allows mining of rare resources',
          unlocks: ['gold_ore', 'silver_ore']
        }
      ],
      4: [
        {
          name: 'Advanced Mining',
          description: 'Further improves mining yields',
          bonus: { miningYield: 0.2 }
        }
      ],
      5: [
        {
          name: 'Master Mining',
          description: 'Allows mining of legendary materials',
          unlocks: ['mithril_ore', 'adamantite']
        }
      ]
    },
    academy: {
      2: [
        {
          name: 'Basic Research',
          description: 'Allows researching basic technologies',
          unlocks: ['basic_research']
        }
      ],
      3: [
        {
          name: 'Advanced Research',
          description: 'Allows researching advanced technologies',
          unlocks: ['advanced_research']
        }
      ],
      4: [
        {
          name: 'Expert Research',
          description: 'Allows researching expert technologies',
          unlocks: ['expert_research']
        }
      ],
      5: [
        {
          name: 'Magical Research',
          description: 'Allows researching magical technologies',
          unlocks: ['magical_research']
        }
      ]
    },
    wall: {
      2: [
        {
          name: 'Reinforced Walls',
          description: 'Increases defensive capabilities',
          bonus: { defense: 0.1 }
        }
      ],
      3: [
        {
          name: 'Guard Posts',
          description: 'Allows posting guards for increased security',
          unlocks: ['guard_post']
        }
      ],
      4: [
        {
          name: 'Fortified Structure',
          description: 'Further increases defensive capabilities',
          bonus: { defense: 0.2 }
        }
      ],
      5: [
        {
          name: 'Impenetrable Defense',
          description: 'Provides maximum defensive capability',
          bonus: { defense: 0.3 },
          unlocks: ['elite_guards']
        }
      ]
    },
    market: {
      2: [
        {
          name: 'Trade Network',
          description: 'Improves trading capabilities',
          bonus: { tradeValue: 0.1 }
        }
      ],
      3: [
        {
          name: 'Exotic Goods',
          description: 'Allows trading rare items',
          unlocks: ['exotic_goods']
        }
      ],
      4: [
        {
          name: 'Market Influence',
          description: 'Increases market influence and trade options',
          bonus: { tradeValue: 0.2 }
        }
      ],
      5: [
        {
          name: 'Trade Empire',
          description: 'Enables trading of the rarest items',
          unlocks: ['legendary_trade_goods']
        }
      ]
    },
    farm: {
      2: [
        {
          name: 'Improved Farming',
          description: 'Increases crop yield by 10%',
          bonus: { farmingYield: 0.1 }
        }
      ],
      3: [
        {
          name: 'Special Crops',
          description: 'Allows growing special crops',
          unlocks: ['rare_herbs', 'magical_seeds']
        }
      ],
      4: [
        {
          name: 'Advanced Agriculture',
          description: 'Increases crop yield by 20%',
          bonus: { farmingYield: 0.2 }
        }
      ],
      5: [
        {
          name: 'Magical Farming',
          description: 'Allows growing magical plants',
          unlocks: ['dragon_fruit', 'golden_apple']
        }
      ]
    },
    
    // Add benefits for the harbor building
    harbor: {
      1: [
        {
          name: 'Basic Harbor',
          description: 'Allows construction of small boats and rafts',
          unlocks: ['small_boat']
        }
      ],
      2: [
        {
          name: 'Improved Docks',
          description: 'Allows construction of medium-sized vessels',
          unlocks: ['medium_boat', 'combat_boat']
        }
      ],
      3: [
        {
          name: 'Advanced Shipyard',
          description: 'Allows construction of large ships and advanced vessels',
          unlocks: ['large_boat', 'steamboat']
        }
      ],
      4: [
        {
          name: 'Naval Engineering',
          description: 'Improves ship construction speed and durability',
          bonus: { shipBuildingSpeed: 0.2, shipDurability: 0.2 }
        }
      ],
      5: [
        {
          name: 'Master Shipyard',
          description: 'Enables construction of the most advanced vessels',
          unlocks: ['flagship', 'trading_galleon'],
          bonus: { shipBuildingSpeed: 0.3, shipDurability: 0.3, navalCapacity: 0.5 }
        }
      ]
    },
    
    // Monster building benefits
    monster_nest: {
      1: [{ name: 'Monster Shelter', description: 'Provides basic shelter for monsters', bonus: { monsterRegeneration: 0.1 } }],
      2: [{ name: 'Improved Nesting', description: 'Allows faster recovery', bonus: { monsterRegeneration: 0.2 } }],
      3: [{ name: 'Advanced Nest', description: 'Attracts more monsters to the area', unlocks: ['monster_spawning'] }]
    },
    monster_forge: {
      1: [{ name: 'Basic Smithing', description: 'Allows crafting simple weapons', unlocks: ['crude_weapon'] }],
      2: [{ name: 'Improved Forge', description: 'Better weapon crafting', bonus: { attackPower: 0.1 } }],
      3: [{ name: 'Monster Arsenal', description: 'Creates better monster weapons', unlocks: ['monster_weapons'] }]
    },
    monster_totem: {
      1: [{ name: 'Ritual Site', description: 'Empowers nearby monsters', bonus: { monsterPower: 0.1 } }],
      2: [{ name: 'Power Totem', description: 'Further empowers monsters', bonus: { monsterPower: 0.2 } }],
      3: [{ name: 'Elder Totem', description: 'Allows commanding other monster groups', unlocks: ['monster_command'] }]
    }
  },
  
  // Helper functions
  getUpgradeRequirements(buildingType, currentLevel) {
    const resources = [];
    const levelMultiplier = currentLevel * 1.5;
    
    // Get the base requirements for this building type
    const buildingDef = this.types[buildingType];
    if (!buildingDef) {
      // Default resources if building type not found
      resources.push({ name: 'Wooden Sticks', quantity: Math.floor(10 * levelMultiplier) });
      resources.push({ name: 'Stone Pieces', quantity: Math.floor(8 * levelMultiplier) });
      return resources;
    }
    
    // Scale base requirements by level
    if (buildingDef.baseRequirements) {
      for (const req of buildingDef.baseRequirements) {
        resources.push({
          name: req.name,
          quantity: Math.floor(req.quantity * levelMultiplier / 1.5) // Adjust by level but account for base being level 1
        });
      }
    }
    
    // Additional resources based on building type and level
    switch (buildingType) {
      case 'smithy':
        if (currentLevel >= 3) {
          resources.push({ name: 'Coal', quantity: Math.floor(3 * levelMultiplier) });
        }
        break;
        
      case 'barracks':
        if (currentLevel >= 3) {
          resources.push({ name: 'Leather', quantity: Math.floor(2 * levelMultiplier) });
        }
        break;
        
      case 'mine':
        // Extra stone for mines
        resources.push({ name: 'Stone Pieces', quantity: Math.floor(5 * levelMultiplier) });
        break;
        
      case 'wall':
        // Walls need more stone
        resources.push({ name: 'Stone Pieces', quantity: Math.floor(10 * levelMultiplier) });
        if (currentLevel >= 3) {
          resources.push({ name: 'Iron Ore', quantity: Math.floor(3 * levelMultiplier) });
        }
        break;
        
      case 'academy':
        resources.push({ name: 'Paper', quantity: Math.floor(3 * levelMultiplier) });
        if (currentLevel >= 2) {
          resources.push({ name: 'Crystal Shard', quantity: currentLevel - 1 });
        }
        break;
        
      case 'market':
        // Extra wood for market stalls
        resources.push({ name: 'Wooden Sticks', quantity: Math.floor(5 * levelMultiplier) });
        resources.push({ name: 'Cloth', quantity: Math.floor(3 * levelMultiplier) });
        break;
        
      case 'farm':
        resources.push({ name: 'Seeds', quantity: Math.floor(5 * levelMultiplier) });
        if (currentLevel >= 2) {
          resources.push({ name: 'Water', quantity: Math.floor(2 * levelMultiplier) });
        }
        break;
        
      case 'harbor':
        // Extra wood and rope for harbor construction
        resources.push({ name: 'Wooden Sticks', quantity: Math.floor(8 * levelMultiplier) });
        resources.push({ name: 'Rope', quantity: Math.floor(4 * levelMultiplier) });
        if (currentLevel >= 2) {
          resources.push({ name: 'Canvas', quantity: Math.floor(3 * levelMultiplier) });
        }
        if (currentLevel >= 3) {
          resources.push({ name: 'Iron Ore', quantity: Math.floor(5 * levelMultiplier) });
        }
        break;
    }
    
    // Higher level buildings need special resources
    if (currentLevel >= 4) {
      resources.push({ name: 'Crystal Shard', quantity: 1 });
    }
    
    return resources;
  },
  
  calculateUpgradeTime(buildingType, currentLevel) {
    // Base upgrade time in seconds
    const baseUpgradeTime = 60; 
    
    // Each level adds 50% more time
    const levelMultiplier = 1 + (currentLevel * 0.5); 
    
    // Get the type-specific multiplier
    const buildingDef = this.types[buildingType];
    const typeMultiplier = buildingDef ? buildingDef.upgradeTimeMultiplier : 1;
    
    // Calculate final time in seconds
    return Math.ceil(baseUpgradeTime * levelMultiplier * typeMultiplier);
  },
  
  getBenefitsForLevel(buildingType, level) {
    if (!this.benefits[buildingType] || !this.benefits[buildingType][level]) {
      return [];
    }
    
    return this.benefits[buildingType][level];
  },
  
  getNewBenefitsForLevel(buildingType, toLevel) {
    return this.getBenefitsForLevel(buildingType, toLevel);
  },
  
  getBuildingIcon(type) {
    return this.types[type]?.icon || "🏠";
  },
  
  getBuildingName(type) {
    return this.types[type]?.name || formatText(type);
  },
  
  getBuildingDescription(type) {
    return this.types[type]?.description || "A building within your structure.";
  }
};

// Utility function to format text nicely
function formatText(text) {
  if (!text) return '';
  return text.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}