export const BIOMES = {
  // LAVA/VOLCANIC BIOMES
  LAVA: {
    MAGMA_FLOW: { name: "magma_flow", color: "#FF2200" },
    LAVA_FLOW: { name: "lava_flow", color: "#FF5000" },
    VOLCANIC_ROCK: { name: "volcanic_rock", color: "#6A3A28" },
    VOLCANIC_SOIL: { name: "volcanic_soil", color: "#7D4B3A" }
  },
  
  // OCEAN BIOMES
  OCEAN: {
    DEEP_OCEAN: { name: "deep_ocean", color: "#0E3B59", water: true },
    OCEAN: { name: "ocean", color: "#1A4F76", water: true },
    SEA: { name: "sea", color: "#2D6693", water: true },
    SHALLOWS: { name: "shallows", color: "#5d99b8", water: true }
  },
  
  // COASTAL BIOMES
  COASTAL: {
    SEA_CLIFF: { name: "sea_cliff", color: "#7A736B" },
    SANDY_BEACH: { name: "sandy_beach", color: "#E8D7A7" },
    ROCKY_SHORE: { name: "rocky_shore", color: "#A8A095" },
    MARSHY_SHORE: { name: "marshy_shore", color: "#607A63" },
    DUNES: { name: "dunes", color: "#D8CBA0" },
    LITTORAL_SCRUB: { name: "littoral_scrub", color: "#A8AA80" },
    SALT_MEADOW: { name: "salt_meadow", color: "#75A080" },
    FLATS: { name: "flats", color: "#C0B990" },
    THICKET: { name: "thicket", color: "#94A078" },
    GROVE: { name: "grove", color: "#5B8A65" }
  },
  
  // WATER FEATURES
  WATER: {
    MOUNTAIN_LAKE: { name: "mountain_lake", color: "#3A7FA0", water: true },
    LAKE: { name: "lake", color: "#4A91AA", water: true },
    MOUNTAIN_RIVER: { name: "mountain_river", color: "#4A8FA0", water: true },
    RIVER: { name: "river", color: "#55AAC5", water: true },
    STREAM: { name: "stream", color: "#65B2C0", water: true },
    RIVULET: { name: "rivulet", color: "#6AADB6", water: true },
    WATER_CHANNEL: { name: "water_channel", color: "#4A80AA", water: true }, // Base color, will be calculated dynamically
  },
  
  // VOLCANIC/SCORCHED BIOMES
  SCORCHED: {
    ACTIVE_VOLCANO: { name: "active_volcano", color: "#9A2A20" },
    VOLCANIC_CALDERA: { name: "volcanic_caldera", color: "#B54A30" },
    VOLCANIC_ASH: { name: "volcanic_ash", color: "#706055" },
    LAVA_FIELDS: { name: "lava_fields", color: "#9D5A40" }
  },
  
  // CLIFF FEATURES
  CLIFF: {
    SHEER_CLIFF: { name: "sheer_cliff", color: "#706860" },
    MOSS_CLIFF: { name: "moss_cliff", color: "#5A6855" },
    ROCKY_CLIFF: { name: "rocky_cliff", color: "#7A736B" },
    STEEP_SLOPE: { name: "steep_slope", color: "#7D7468" },
    RUGGED_SLOPE: { name: "rugged_slope", color: "#82796D" }
  },
  
  // HIGH MOUNTAINS (92%+ elevation)
  HIGH_MOUNTAIN: {
    SNOW_CAP: { name: "snow_cap", color: "#FFFFFF" },
    GLACIAL_PEAK: { name: "glacial_peak", color: "#F0FFFF" },
    ALPINE_SNOW: { name: "alpine_snow", color: "#E8F0FF" },
    SNOWY_PEAKS: { name: "snowy_peaks", color: "#D8E0EA" },
    ROCKY_PEAKS: { name: "rocky_peaks", color: "#C0C0C8" },
    VOLCANIC_PEAK: { name: "volcanic_peak", color: "#A03A25" },
    OBSIDIAN_RIDGE: { name: "obsidian_ridge", color: "#55352F" },
    CRAGGY_PEAKS: { name: "craggy_peaks", color: "#83756A" },
    RUGGED_PEAKS: { name: "rugged_peaks", color: "#AAA0B5" }
  },
  
  // MOUNTAINS (85-92% elevation)
  MOUNTAIN: {
    GLACIER: { name: "glacier", color: "#CCEEFF" },
    SNOW_FIELD: { name: "snow_field", color: "#E0F0FF" },
    SNOWY_FOREST: { name: "snowy_forest", color: "#A5B5C5" },
    MOUNTAIN_FOREST: { name: "mountain_forest", color: "#607D55" },
    ROCKY_FOREST: { name: "rocky_forest", color: "#6D7A60" },
    ALPINE_SHRUBS: { name: "alpine_shrubs", color: "#747C63" },
    VOLCANIC_SLOPES: { name: "volcanic_slopes", color: "#8A4B3C" },
    BARREN_SLOPES: { name: "barren_slopes", color: "#8E7F6E" },
    MOUNTAIN_SCRUB: { name: "mountain_scrub", color: "#7D8766" },
    BARE_MOUNTAIN: { name: "bare_mountain", color: "#A09085" }
  },
  
  // HIGH HILLS (78-85% elevation)
  HIGH_HILLS: {
    SNOW_PATCHED_HILLS: { name: "snow_patched_hills", color: "#D5E5F5" },
    FOGGY_PEAKS: { name: "foggy_peaks", color: "#B0C0D0" },
    ROCKY_SLOPES: { name: "rocky_slopes", color: "#A58775" },
    ALPINE_MEADOW: { name: "alpine_meadow", color: "#8DAD70" },
    HIGHLAND_FOREST: { name: "highland_forest", color: "#5D7B4A" },
    HIGHLAND: { name: "highland", color: "#7B8F5D" },
    ROCKY_HIGHLAND: { name: "rocky_highland", color: "#8D9075" },
    MESA: { name: "mesa", color: "#B09579" }
  },
  
  // MID ELEVATION (58-78%)
  MID_ELEVATION: {
    MOUNTAIN_FROST: { name: "mountain_frost", color: "#C5D5E5" },
    ANCIENT_FOREST: { name: "ancient_forest", color: "#29543A" },
    TROPICAL_RAINFOREST: { name: "tropical_rainforest", color: "#306B44" },
    TEMPERATE_FOREST: { name: "temperate_forest", color: "#3D7A4D" },
    MOUNTAIN_TRANSITION: { name: "mountain_transition", color: "#5A7B59" },
    ENCHANTED_GROVE: { name: "enchanted_grove", color: "#4E8956" },
    WOODLAND: { name: "woodland", color: "#5D9555" },
    SHRUBLAND: { name: "shrubland", color: "#8BA662" },
    DRY_SHRUBLAND: { name: "dry_shrubland", color: "#A8A76C" },
    SCRUBLAND: { name: "scrubland", color: "#B9A77C" },
    BADLANDS: { name: "badlands", color: "#BC9668" }
  },
  
  // LOWER MID ELEVATION (50-58%)
  LOWER_MID_ELEVATION: {
    FEY_FOREST: { name: "fey_forest", color: "#2E5D40" },
    DEEP_FOREST: { name: "deep_forest", color: "#356848" },
    DENSE_FOREST: { name: "dense_forest", color: "#3A7446" },
    FOREST: { name: "forest", color: "#407B4C" },
    LIGHT_FOREST: { name: "light_forest", color: "#558759" },
    SCATTERED_TREES: { name: "scattered_trees", color: "#6A9861" },
    PRAIRIE: { name: "prairie", color: "#91A86E" },
    SAVANNA: { name: "savanna", color: "#B4A878" },
    DRY_SAVANNA: { name: "dry_savanna", color: "#C2AA71" }
  },
  
  // LOW ELEVATION (40-50%)
  LOW_ELEVATION: {
    SWAMP: { name: "swamp", color: "#4E6855" },
    MARSH: { name: "marsh", color: "#5E7959" },
    WET_GRASSLAND: { name: "wet_grassland", color: "#5F864A" },
    GRASSLAND: { name: "grassland", color: "#6B9850" },
    MEADOW: { name: "meadow", color: "#7BA758" },
    PLAINS: { name: "plains", color: "#9CB568" },
    DRY_GRASSLAND: { name: "dry_grassland", color: "#B1B173" },
    ARID_PLAINS: { name: "arid_plains", color: "#C0A97A" },
    DESERT_SCRUB: { name: "desert_scrub", color: "#CCAD6E" }
  },
  
  // LOWEST ELEVATION (32-40%)
  LOWEST_ELEVATION: {
    BOG: { name: "bog", color: "#4D5E50" },
    WETLAND: { name: "wetland", color: "#5A6A55" },
    MOOR: { name: "moor", color: "#657355" },
    LOWLAND: { name: "lowland", color: "#768355" },
    DRY_PLAINS: { name: "dry_plains", color: "#8D9565" },
    STEPPE: { name: "steppe", color: "#A6A072" },
    CHALKY_PLAINS: { name: "chalky_plains", color: "#C8BC90" },
    DESERT: { name: "desert", color: "#E8D7A7" },
    BARREN_DESERT: { name: "barren_desert", color: "#F0E3B2" }
  },
  
  // BOTTOM LANDS (below 32%)
  BOTTOM_LANDS: {
    MUDFLATS: { name: "mudflats", color: "#5F6855" },
    DELTA: { name: "delta", color: "#6A7355" },
    SALT_FLAT: { name: "salt_flat", color: "#D0C9AA" },
    DRY_BASIN: { name: "dry_basin", color: "#E5D6A9" }
  }
};

// Export helper function to calculate water channel color
export function getWaterChannelColor(waterNetworkValue) {
  const blueIntensity = Math.min(0.9, 0.7 + waterNetworkValue * 0.3);
  const colorComponent = Math.floor(170 + waterNetworkValue * 40);
  return `rgb(${Math.floor(colorComponent * 0.3)},${Math.floor(colorComponent * 0.6)},${colorComponent})`;
}