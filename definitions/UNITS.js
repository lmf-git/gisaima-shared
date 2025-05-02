const UNITS = {
    // Player character - represents the player themselves
    'player': {
        name: 'Player Character',
        description: "The player's own character",
        category: 'player',
        type: 'player',
        power: 2,
        icon: 'player'
    },

    // Player Units - Basic units
    'basic_warrior': {
        name: 'Basic Warrior',
        description: "Basic melee fighter with sword and shield",
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
        category: 'player',
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
    },

    // Monster Units
    'goblin': {
        name: "Goblin Raiders",
        description: "Small, crafty creatures that attack in groups",
        category: 'monster',
        probability: 0.3,
        unitCountRange: [1, 4],
        itemChance: 0.6,
        mergeLimit: 8,
        power: 0.7,
        speed: 1.2,
        possibleItems: ['Wooden Sticks', 'Stolen Goods', 'Crude Weapon'],
        biomePreference: ['plains', 'forest']
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
        possibleItems: ['Wolf Meat', 'Wolf Pelt', 'Wolf Fang'],
        biomePreference: ['forest', 'tundra']
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
        possibleItems: ['Ancient Coin', 'Crude Weapon', 'Leather Scraps'],
        biomePreference: ['plains', 'forest']
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
        possibleItems: ['Spider Silk', 'Venom Sac', 'Spider Eye'],
        biomePreference: ['forest', 'swamp']
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
        possibleItems: ['Bone Dust', 'Ancient Blade', 'Soul Essence'],
        biomePreference: ['desert', 'mountain', 'ruins']
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
        possibleItems: ['Troll Hide', 'Troll Club', 'Troll Tooth'],
        biomePreference: ['mountain', 'hills']
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
        possibleItems: ['Elemental Essence', 'Shiny Gem', 'Magical Residue'],
        biomePreference: ['tundra', 'desert', 'swamp']
    }
};

export default UNITS;