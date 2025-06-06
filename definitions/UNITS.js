const UNITS = {
    // Player character - represents the player themselves
    'player': {
        name: 'Player Character',
        description: "The player's own character",
        category: 'player',
        type: 'player',
        power: 10,
        icon: 'player'
    },
    
    'human_warrior': {
        name: 'Footman',
        description: "Armored sword-wielder trained in formation combat",
        category: 'player',
        type: 'warrior',
        power: 1.2,
        timePerUnit: 1.1,
        icon: 'sword',
        cost: { WOODEN_STICKS: 2, IRON_SHARDS: 1 },
        recruitment: {
        sortOrder: 11,
        tooltip: "Sturdy and disciplined"
        }
    },
    'human_scout': {
        name: 'Pathfinder',
        description: "Quick runner, ideal for early recon",
        category: 'player',
        type: 'scout',
        power: 0.6,
        timePerUnit: 0.75,
        icon: 'boots',
        cost: { WOODEN_STICKS: 1, LEATHER: 2 },
        requirements: {
        structureLevel: 1
        },
        recruitment: {
        sortOrder: 21,
        tooltip: "Swift explorer with decent range"
        }
    },
    'goblin_warrior': {
        name: 'Rager',
        description: "Wild axe-wielder with low armor but high aggression",
        category: 'player',
        type: 'warrior',
        power: 1,
        timePerUnit: 0.9,
        icon: 'axe',
        cost: { WOODEN_STICKS: 1, BONE: 2 },
        recruitment: {
        sortOrder: 12,
        tooltip: "Cheap and fierce"
        }
    },
    'goblin_scout': {
        name: 'Sneakblade',
        description: "Stealthy scout with backstab potential",
        category: 'player',
        type: 'scout',
        power: 0.7,
        timePerUnit: 0.6,
        icon: 'dagger',
        cost: { LEATHER: 1, BONE: 1 },
        requirements: {
        structureLevel: 1
        },
        recruitment: {
        sortOrder: 22,
        tooltip: "Quick, quiet, and deadly"
        }
    },
    'elf_warrior': {
        name: 'Bladelord',
        description: "Graceful fighter with dual blades",
        category: 'player',
        type: 'warrior',
        power: 1.4,
        timePerUnit: 1.2,
        icon: 'blades',
        cost: { WOODEN_STICKS: 2, MOON_SILVER: 1 },
        recruitment: {
        sortOrder: 13,
        tooltip: "Fast, elegant melee unit"
        }
    },
    'elf_scout': {
        name: 'Windseer',
        description: "Eagle-eyed archer with long sight",
        category: 'player',
        type: 'scout',
        power: 0.8,
        timePerUnit: 0.8,
        icon: 'eye',
        cost: { FEATHER: 1, WOODEN_STICKS: 2 },
        requirements: {
        structureLevel: 1
        },
        recruitment: {
        sortOrder: 23,
        tooltip: "Excellent visibility and range"
        }
    },
    'fairy_warrior': {
        name: 'Thorn Knight',
        description: "Tiny but magical melee defender",
        category: 'player',
        type: 'warrior',
        power: 0.9,
        timePerUnit: 0.8,
        icon: 'thorn',
        cost: { GLOW_DUST: 2, PETAL: 2 },
        recruitment: {
        sortOrder: 14,
        tooltip: "Magic-resistant tiny tank"
        }
    },
    'fairy_scout': {
        name: 'Glimmerwing',
        description: "Flies quickly and sees across wide ranges",
        category: 'player',
        type: 'scout',
        power: 0.4,
        timePerUnit: 0.5,
        icon: 'wing',
        cost: { GLOW_DUST: 1, FEATHER: 2 },
        requirements: {
        structureLevel: 1
        },
        recruitment: {
        sortOrder: 24,
        tooltip: "Fastest scout available"
        }
    },
    'dwarf_warrior': {
        name: 'Stoneguard',
        description: "Heavy axe and shield user, excels in defense",
        category: 'player',
        type: 'warrior',
        power: 1.5,
        timePerUnit: 1.3,
        icon: 'hammer',
        cost: { STONE_PIECES: 2, IRON_SHARDS: 2 },
        recruitment: {
        sortOrder: 15,
        tooltip: "Tough and slow defender"
        }
    },
    'dwarf_scout': {
        name: 'Tunnel Scout',
        description: "Short-range, underground recon unit",
        category: 'player',
        type: 'scout',
        power: 0.5,
        timePerUnit: 0.85,
        icon: 'pick',
        cost: { STONE_PIECES: 1, TORCH: 1 },
        requirements: {
        structureLevel: 1
        },
        recruitment: {
        sortOrder: 25,
        tooltip: "Best in underground terrain"
        }
    },
    'healer': {
        name: 'Healer',
        description: "Supports allies by restoring their strength",
        category: 'player',
        type: 'support',
        power: 0.2,
        timePerUnit: 1.2,
        icon: 'cross',
        cost: { HERB: 2, WATER: 1 },
        recruitment: {
        sortOrder: 30,
        tooltip: "Restores nearby units slowly"
        }
    },
    'shaman': {
        name: 'Shaman',
        description: "Casts weak offensive spells and buffs",
        category: 'player',
        type: 'support',
        power: 0.8,
        timePerUnit: 1.5,
        icon: 'staff',
        cost: { HERB: 1, BONE: 1, GLOW_DUST: 1 },
        recruitment: {
        sortOrder: 31,
        tooltip: "Magic support unit"
        }
    },
    'siege_engineer': {
        name: 'Engineer',
        description: "Builds and operates siege equipment",
        category: 'player',
        type: 'support',
        power: 1,
        timePerUnit: 2,
        icon: 'gear',
        cost: { IRON_SHARDS: 3, WOODEN_STICKS: 3 },
        recruitment: {
        sortOrder: 40,
        tooltip: "Essential for breaching defenses"
        }
    },

    // Race-specific units
    'human_knight': {
        name: 'Knight',
        description: "Heavily armored warrior with high defense",
        category: 'player',
        type: 'knight',
        power: 2,
        timePerUnit: 1.5, // in ticks (was 90 seconds)
        icon: 'shield',
        race: 'human',
        cost: { WOODEN_STICKS: 1, STONE_PIECES: 2, IRON: 1 },
        requirements: {
            structureLevel: 2,
            race: 'human',
            structureType: ['basic_shelter', 'workshop'], // Now requires specific structure types
            buildingType: 'smithy',     // Requires a smithy building
            buildingLevel: 2            // Smithy must be at least level 2
        },
        recruitment: {
            sortOrder: 100,
            tooltip: "Strong defensive unit that requires a level 2 smithy",
            unavailableText: "Requires Human structure with level 2 smithy"
        }
    },
    'elf_archer': {
        name: 'Elven Archer',
        description: "Skilled ranged fighter with deadly accuracy",
        category: 'player',
        type: 'archer',
        power: 1.5,
        timePerUnit: 1.25, // in ticks (was 75 seconds)
        icon: 'bow',
        race: 'elf',
        cost: { WOODEN_STICKS: 3, LEATHER: 1 },
        requirements: {
            structureLevel: 2,
            race: 'elf',
            buildingType: 'barracks', // Requires a barracks building
            buildingLevel: 1          // Barracks must be at least level 1
        },
        recruitment: {
            sortOrder: 110,
            tooltip: "Excellent ranged attacker, requires a barracks",
            unavailableText: "Requires Elf structure with barracks"
        }
    },
    'dwarf_defender': {
        name: 'Dwarven Defender',
        description: "Sturdy warrior specialized in defense",
        category: 'player',
        type: 'defender',
        power: 2,
        timePerUnit: 1.5, // in ticks (was 90 seconds)
        icon: 'shield',
        race: 'dwarf',
        cost: { STONE_PIECES: 2, IRON: 2 },
        requirements: {
            structureLevel: 2,
            race: 'dwarf',
            buildingType: 'wall',  // Requires defensive wall building
            buildingLevel: 2       // Wall must be at least level 2
        },
        recruitment: {
            sortOrder: 120,
            tooltip: "High defense, low mobility, requires defensive walls",
            unavailableText: "Requires Dwarf structure with level 2 defensive wall"
        }
    },
    'goblin_raider': {
        name: 'Goblin Raider',
        description: "Quick but weak fighter, good in groups",
        category: 'player',
        type: 'raider',
        power: 0.75,
        timePerUnit: 0.5, // in ticks (was 30 seconds)
        icon: 'sword',
        race: 'goblin',
        cost: { WOODEN_STICKS: 1 },
        requirements: {
            structureLevel: 2,
            race: 'goblin'
        },
        recruitment: {
            sortOrder: 130,
            tooltip: "Fast but fragile",
            unavailableText: "Requires Goblin structure level 2"
        }
    },
    'fairy_enchanter': {
        name: 'Fairy Enchanter',
        description: "Magical unit with support abilities",
        category: 'player',
        type: 'enchanter',
        power: 1.5,
        timePerUnit: 1, // in ticks (was 60 seconds)
        icon: 'staff',
        race: 'fairy',
        cost: { herbs: 2, crystal: 1 },
        requirements: {
            structureLevel: 2,
            race: 'fairy',
            buildingType: 'academy',  // Requires academy building
            buildingLevel: 1,         // Academy must be at least level 1
            research: 'basic_research' // Requires basic research to be completed
        },
        recruitment: {
            sortOrder: 140,
            tooltip: "Support caster with buffs, requires academy research",
            unavailableText: "Requires Fairy structure with academy and basic research"
        }
    },

    // Elite units
    'elite_guard': {
        name: 'Elite Guard',
        description: "Highly trained soldier with advanced combat skills",
        category: 'player',
        type: 'elite',
        power: 3,
        timePerUnit: 2, // in ticks (was 120 seconds)
        icon: 'shield',
        cost: { WOODEN_STICKS: 2, STONE_PIECES: 2, IRON: 2 },
        requirements: {
            structureType: ['fortress', 'stronghold', 'watchtower'], // Added watchtower as valid structure
            structureLevel: 2,
            buildingType: 'barracks',  // Requires barracks building
            buildingLevel: 3           // Barracks must be at least level 3
        },
        recruitment: {
            sortOrder: 200,
            tooltip: "Premium fighting unit, requires advanced barracks",
            unavailableText: "Requires fortress/stronghold/watchtower with level 3 barracks"
        }
    },
    'siege_ram': {
        name: 'Battering Ram',
        description: "Siege unit effective against structures",
        category: 'player',
        type: 'siege',
        power: 1.5,
        timePerUnit: 3, // in ticks (was 180 seconds)
        icon: 'shield',
        cost: { WOODEN_STICKS: 5, STONE_PIECES: 3, IRON: 2 },
        requirements: {
            structureType: ['fortress', 'stronghold', 'workshop'], // Added workshop as valid structure
            structureLevel: 3,
            buildingType: 'smithy',    // Requires smithy building
            buildingLevel: 4,          // Smithy must be at least level 4
            research: 'siegecraft'     // Requires siegecraft research
        },
        recruitment: {
            sortOrder: 300,
            tooltip: "Excellent against buildings, requires advanced smithy",
            unavailableText: "Requires level 3 structure with level 4 smithy and siegecraft research"
        }
    },

    // New unit with structure & building requirements
    'master_craftsman': {
        name: 'Master Craftsman',
        description: "Skilled worker who can construct and repair at higher speeds",
        category: 'player',
        type: 'worker',
        power: 1.0,
        timePerUnit: 2, // in ticks (was 120 seconds)
        icon: 'hammer',
        cost: { WOODEN_STICKS: 3, STONE_PIECES: 3, IRON: 1 },
        requirements: {
            structureType: ['workshop', 'storage'], // Requires specific structure types
            structureLevel: 2,
            buildingType: 'smithy',    // Requires smithy building
            buildingLevel: 3           // Smithy must be at least level 3
        },
        recruitment: {
            sortOrder: 250,
            tooltip: "Boosts construction speed, requires advanced workshop",
            unavailableText: "Requires workshop/storage with level 3 smithy"
        }
    },

    // New unit with resource building requirement
    'resource_gatherer': {
        name: 'Expert Gatherer',
        description: "Specialized unit that gathers resources more efficiently",
        category: 'player',
        type: 'gatherer',
        power: 0.5,
        timePerUnit: 1.5, // in ticks (was 90 seconds)
        icon: 'pickaxe',
        cost: { WOODEN_STICKS: 2, tools: 1 },
        requirements: {
            structureType: ['storage'], // Requires storage structure
            structureLevel: 1,
            buildingType: 'mine',    // Requires mine building
            buildingLevel: 2         // Mine must be at least level 2
        },
        recruitment: {
            sortOrder: 150,
            tooltip: "Gathers resources faster, requires mining operations",
            unavailableText: "Requires storage structure with level 2 mine"
        }
    },

    // New Boat Units - Water Transportation
    'small_boat': {
        name: 'Small Raft',
        description: "Simple wooden raft for crossing water",
        category: 'player',
        type: 'boat',
        power: 0.5,
        capacity: 3, // Can transport 3 units
        timePerUnit: 1.0,
        icon: 'raft',
        motion: ['water'], // Can only traverse water
        cost: { WOODEN_STICKS: 8, VINE: 4 },
        requirements: {
            structureLevel: 1
        },
        recruitment: {
            sortOrder: 400,
            tooltip: "Basic water transport for small groups"
        }
    },
    
    'medium_boat': {
        name: 'Fishing Boat',
        description: "Sturdy boat with modest cargo capacity",
        category: 'player',
        type: 'boat',
        power: 1.0,
        capacity: 6, // Can transport 6 units
        timePerUnit: 1.5,
        icon: 'boat',
        motion: ['water'],
        cost: { WOODEN_STICKS: 15, LEATHER: 5, ROPE: 3 },
        requirements: {
            structureLevel: 2,
            buildingType: 'harbor',
            buildingLevel: 1
        },
        recruitment: {
            sortOrder: 410,
            tooltip: "Medium capacity vessel for water exploration",
            unavailableText: "Requires level 2 structure with harbor"
        }
    },
    
    'large_boat': {
        name: 'Trading Ship',
        description: "Large vessel for transporting troops and cargo",
        category: 'player',
        type: 'ship',
        power: 1.5,
        capacity: 12, // Can transport 12 units
        timePerUnit: 2.5,
        icon: 'ship',
        motion: ['water'],
        cost: { WOODEN_STICKS: 25, IRON_SHARDS: 10, ROPE: 8, CANVAS: 5 },
        requirements: {
            structureLevel: 3,
            buildingType: 'harbor',
            buildingLevel: 2
        },
        recruitment: {
            sortOrder: 420,
            tooltip: "Large capacity vessel for major water expeditions",
            unavailableText: "Requires level 3 structure with level 2 harbor"
        }
    },
    
    'combat_boat': {
        name: 'War Canoe',
        description: "Fast attack boat armed with weapons",
        category: 'player',
        type: 'warship',
        power: 3.0,
        capacity: 4, // Combat focused, less capacity
        timePerUnit: 2.0,
        icon: 'warship',
        motion: ['water'],
        cost: { WOODEN_STICKS: 15, IRON_SHARDS: 8, BONE: 5 },
        requirements: {
            structureLevel: 2,
            buildingType: 'harbor',
            buildingLevel: 1,
            buildingType2: 'barracks',
            buildingLevel2: 2
        },
        recruitment: {
            sortOrder: 430,
            tooltip: "Naval combat vessel with decent speed",
            unavailableText: "Requires harbor and level 2 barracks"
        }
    },
    
    'steamboat': {
        name: 'Steamboat',
        description: "Advanced vessel powered by steam engine",
        category: 'player',
        type: 'steamship',
        power: 2.5,
        capacity: 10,
        speed: 1.5, // Faster than normal ships
        timePerUnit: 3.0,
        icon: 'steamship',
        motion: ['water'],
        cost: { WOODEN_STICKS: 20, IRON: 15, COAL: 10, GEAR: 5 },
        requirements: {
            structureLevel: 3,
            buildingType: 'harbor',
            buildingLevel: 3,
            research: 'steam_power'
        },
        recruitment: {
            sortOrder: 450,
            tooltip: "Fast advanced vessel with good capacity",
            unavailableText: "Requires level 3 harbor and steam power research"
        }
    },
    
    'explorer_boat': {
        name: 'Explorer Vessel',
        description: "Specialized boat for charting unknown waters",
        category: 'player',
        type: 'explorership',
        power: 1.0,
        capacity: 5,
        visibility: 2.0, // Increased visibility range
        timePerUnit: 2.0,
        icon: 'explorership',
        motion: ['water'],
        cost: { WOODEN_STICKS: 18, CANVAS: 6, TELESCOPE: 1 },
        requirements: {
            structureLevel: 2,
            buildingType: 'harbor',
            buildingLevel: 1,
            buildingType2: 'observatory',
            buildingLevel2: 1
        },
        recruitment: {
            sortOrder: 440,
            tooltip: "Exploration vessel with enhanced visibility",
            unavailableText: "Requires harbor and observatory"
        }
    },
    
    // Race-specific boats
    'elven_swan_boat': {
        name: 'Swan Ship',
        description: "Elegant elven vessel with magical properties",
        category: 'player',
        type: 'magicship',
        race: 'elf',
        power: 2.0,
        capacity: 8,
        speed: 1.3, // Faster than standard ships
        timePerUnit: 2.0,
        icon: 'swanship',
        motion: ['water'],
        cost: { WOODEN_STICKS: 15, MOON_SILVER: 5, GLOW_DUST: 3 },
        requirements: {
            structureLevel: 2,
            race: 'elf',
            buildingType: 'harbor'
        },
        recruitment: {
            sortOrder: 460,
            tooltip: "Elegant elven vessel with enhanced speed",
            unavailableText: "Requires Elven structure with harbor"
        }
    },
    
    'dwarf_ironclad': {
        name: 'Ironclad',
        description: "Heavy dwarven vessel with metal plating",
        category: 'player',
        type: 'ironship',
        race: 'dwarf',
        power: 4.0, // High combat power
        capacity: 7,
        timePerUnit: 3.0,
        icon: 'ironship',
        motion: ['water'],
        cost: { IRON: 20, STONE_PIECES: 15, COAL: 8 },
        requirements: {
            structureLevel: 2,
            race: 'dwarf',
            buildingType: 'harbor',
            buildingLevel: 2
        },
        recruitment: {
            sortOrder: 470,
            tooltip: "Heavily armored dwarven combat vessel",
            unavailableText: "Requires Dwarven structure with level 2 harbor"
        }
    },
    
    'fairy_lily_pad': {
        name: 'Lily Pad Skiff',
        description: "Magical fairy vessel that glides across water",
        category: 'player',
        type: 'natureship',
        race: 'fairy',
        power: 0.5,
        capacity: 4,
        speed: 1.8, // Very fast but fragile
        timePerUnit: 1.0,
        icon: 'lilypad',
        motion: ['water'],
        cost: { PETAL: 10, GLOW_DUST: 5, HERB: 3 },
        requirements: {
            structureLevel: 1,
            race: 'fairy'
        },
        recruitment: {
            sortOrder: 480,
            tooltip: "Fast fairy vessel with nature magic",
            unavailableText: "Requires Fairy structure"
        }
    },
    
    // Monster Units
    'ork': {
        name: "Goblin Raiders",
        description: "Small, crafty creatures that attack in groups",
        category: 'monster',
        probability: 0.3,
        unitCountRange: [1, 4],
        itemChance: 0.6,
        mergeLimit: 8,
        power: 0.7,
        speed: 1.2,
        motion: ['ground'], // Adding motion property for existing monsters
        possibleItems: ['Wooden Sticks', 'Stolen Goods', 'Crude Weapon'],
        biomePreference: ['plains', 'forest'],
        personalityPreferences: ['SNEAKY', 'CAUTIOUS'] // Goblins tend to be sneaky thieves
    },
    'wolf': {
        name: "Wild Wolves",
        description: "Fast predators that hunt in packs",
        category: 'monster',
        probability: 0.2,
        unitCountRange: [2, 5],
        itemChance: 0.4,
        mergeLimit: 10,
        power: 1.2,
        speed: 1.5,
        motion: ['ground'], // Adding motion property
        possibleItems: ['Wolf Meat', 'Wolf Pelt', 'Wolf Fang'],
        biomePreference: ['forest', 'tundra'],
        personalityPreferences: ['FERAL', 'AGGRESSIVE', 'TERRITORIAL'] // Wolves are wild and territorial
    },
    'bandit': {
        name: "Bandits",
        description: "Outlaw humans that prey on travelers",
        category: 'monster',
        probability: 0.15,
        unitCountRange: [2, 4],
        itemChance: 0.8,
        mergeLimit: 6,
        power: 1.0,
        speed: 1.0,
        motion: ['ground'], // Adding motion property
        possibleItems: ['Ancient Coin', 'Crude Weapon', 'Leather Scraps'],
        biomePreference: ['plains', 'forest'],
        personalityPreferences: ['AGGRESSIVE', 'SNEAKY'] // Bandits are either direct attackers or stealthy thieves
    },
    'spider': {
        name: "Giant Spiders",
        description: "Venomous arachnids that spin webs and hunt prey",
        category: 'monster',
        probability: 0.15,
        unitCountRange: [1, 6],
        itemChance: 0.5,
        mergeLimit: 12,
        power: 0.9,
        speed: 1.2,
        motion: ['ground'], // Adding motion property
        possibleItems: ['Spider Silk', 'Venom Sac', 'Spider Eye'],
        biomePreference: ['forest', 'swamp'],
        personalityPreferences: ['SNEAKY', 'TERRITORIAL'] // Spiders are territorial and sneaky
    },
    'skeleton': {
        name: "Undead Skeletons",
        description: "Animated remains of fallen warriors",
        category: 'monster',
        probability: 0.1,
        unitCountRange: [3, 7],
        itemChance: 0.7,
        mergeLimit: 15,
        power: 0.8,
        speed: 0.9,
        motion: ['ground'], // Adding motion property
        possibleItems: ['Bone Dust', 'Ancient Blade', 'Soul Essence'],
        biomePreference: ['desert', 'mountain', 'ruins'],
        personalityPreferences: ['NOMADIC', 'FERAL'] // Undead wander aimlessly and unpredictably
    },
    'troll': {
        name: "Mountain Troll",
        description: "Massive, brutish creatures with regenerative abilities",
        category: 'monster',
        probability: 0.05,
        unitCountRange: [1, 2],
        itemChance: 0.9,
        mergeLimit: 3,
        power: 2.5,
        speed: 0.7,
        motion: ['ground'], // Adding motion property
        possibleItems: ['Troll Hide', 'Troll Club', 'Troll Tooth'],
        biomePreference: ['mountain', 'hills'],
        personalityPreferences: ['AGGRESSIVE', 'TERRITORIAL'] // Trolls are aggressive and territorial
    },
    'elemental': {
        name: "Wild Elemental",
        description: "Magical manifestations of natural forces",
        category: 'monster',
        probability: 0.05,
        unitCountRange: [1, 3],
        itemChance: 0.8,
        mergeLimit: 5,
        power: 2.0,
        speed: 1.0,
        motion: ['ground', 'flying'], // Elementals can fly
        possibleItems: ['Elemental Essence', 'Shiny Gem', 'Magical Residue'],
        biomePreference: ['tundra', 'desert', 'swamp'],
        personalityPreferences: ['FERAL', 'NOMADIC'] // Elementals are wild and wander
    },
    
    // New Water-Only Monster Units
    'merfolk': {
        name: "Merfolk Raiders",
        description: "Aquatic humanoids skilled with tridents and water magic",
        category: 'monster',
        probability: 0.15,
        unitCountRange: [2, 5],
        itemChance: 0.7,
        mergeLimit: 8,
        power: 1.3,
        speed: 1.2,
        motion: ['water'], // Water-only movement
        possibleItems: ['Coral Shard', 'Pearl', 'Sea Essence'],
        biomePreference: ['ocean', 'sea', 'shallows'],
        personalityPreferences: ['TERRITORIAL', 'AGGRESSIVE']
    },
    'sea_serpent': {
        name: "Sea Serpent",
        description: "Long, snake-like aquatic creature with powerful jaws",
        category: 'monster',
        probability: 0.1,
        unitCountRange: [1, 2],
        itemChance: 0.6,
        mergeLimit: 3,
        power: 2.0,
        speed: 1.4,
        motion: ['water'], // Water-only movement
        possibleItems: ['Serpent Scale', 'Serpent Tooth', 'Sea Essence'],
        biomePreference: ['deep_ocean', 'ocean'],
        personalityPreferences: ['AGGRESSIVE', 'TERRITORIAL']
    },
    'shark': {
        name: "Shark Pack",
        description: "Sleek, efficient hunters of the deep",
        category: 'monster',
        probability: 0.2,
        unitCountRange: [2, 4],
        itemChance: 0.5,
        mergeLimit: 7,
        power: 1.5,
        speed: 1.6,
        motion: ['water'], // Water-only movement
        possibleItems: ['Shark Tooth', 'Shark Fin', 'Raw Fish'],
        biomePreference: ['ocean', 'deep_ocean', 'sea'],
        personalityPreferences: ['FERAL', 'NOMADIC']
    },
    'kraken': {
        name: "Kraken",
        description: "Massive tentacled monster of the deep seas",
        category: 'monster',
        probability: 0.05,
        unitCountRange: [1, 1],
        itemChance: 0.9,
        mergeLimit: 1,
        power: 3.0,
        speed: 0.8,
        motion: ['water'], // Water-only movement
        possibleItems: ['Kraken Ink', 'Giant Tentacle', 'Ancient Pearl'],
        biomePreference: ['deep_ocean'],
        personalityPreferences: ['TERRITORIAL', 'AGGRESSIVE']
    },
    'drowned': {
        name: "Drowned Dead",
        description: "Waterlogged undead that lurk beneath the waves",
        category: 'monster',
        probability: 0.15,
        unitCountRange: [3, 6],
        itemChance: 0.6,
        mergeLimit: 10,
        power: 0.8,
        speed: 0.7,
        motion: ['water'], // Water-only movement
        possibleItems: ['Waterlogged Bone', 'Barnacles', 'Rusted Metal'],
        biomePreference: ['sea', 'shallows', 'river'],
        personalityPreferences: ['FERAL', 'NOMADIC']
    }
};

export default UNITS;