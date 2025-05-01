
/**
 * Merges two arrays of items, combining quantities of identical items based on their properties
 * This ensures items of the same type are stacked together rather than appearing as separate entries
 * 
 * @param {Array} existingItems Array of existing items
 * @param {Array} newItems Array of new items to merge
 * @returns {Array} Merged array with combined quantities for identical items
 */
export function merge(existingItems = [], newItems = []) {
    // Create a map to track items by their unique properties
    const itemMap = new Map();
    
    // Ensure arrays are valid
    const existing = Array.isArray(existingItems) ? existingItems : [];
    const additional = Array.isArray(newItems) ? newItems : [];
    
    // First, add all existing items to the map
    existing.forEach(item => {
      if (!item) return;
      const key = `${item.name}|${item.type || 'generic'}|${item.rarity || 'common'}`;
      itemMap.set(key, { 
        ...item, 
        quantity: item.quantity || 1 
      });
    });
    
    // Then merge in new items, combining quantities for identical items
    additional.forEach(item => {
      if (!item) return;
      const key = `${item.name}|${item.type || 'generic'}|${item.rarity || 'common'}`;
      if (itemMap.has(key)) {
        // Item exists, combine quantities
        const existingItem = itemMap.get(key);
        existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
        // Preserve the original ID
        itemMap.set(key, existingItem);
      } else {
        // New item, ensure it has a quantity
        const newItem = { 
          ...item,
          quantity: item.quantity || 1
        };
        itemMap.set(key, newItem);
      }
    });
    
    // Convert map back to array
    return Array.from(itemMap.values());
  }
  