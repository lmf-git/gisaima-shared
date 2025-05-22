/**
 * Merges two collections of items, combining quantities of identical items based on their item codes
 * This ensures items of the same type are stacked together rather than appearing as separate entries
 * 
 * @param {Object|Array} existingItems Collection of existing items (object format {item_code: quantity} or array of objects)
 * @param {Object|Array} newItems Collection of new items to merge (object format {item_code: quantity} or array of objects)
 * @returns {Object} Merged items in the format {item_code: quantity}
 */
export function merge(existingItems = [], newItems = []) {
  // Initialize result object to store merged items
  const result = {};
  
  // Handle conversion from legacy array format to new object format
  function processItems(items, targetObj) {
    if (!items) return;
    
    if (Array.isArray(items)) {
      // Convert legacy array format to new object format
      items.forEach(item => {
        if (!item) return;
        
        // Handle items in array format (legacy format)
        const itemCode = item.id || item.name;
        if (!itemCode) return;
        
        const normalizedCode = itemCode.toUpperCase();
        const quantity = item.quantity || 1;
        
        targetObj[normalizedCode] = (targetObj[normalizedCode] || 0) + quantity;
      });
    } else if (typeof items === 'object') {
      // Items already in object format {item_code: quantity}
      Object.entries(items).forEach(([code, quantity]) => {
        if (!code || typeof quantity !== 'number') return;
        
        const normalizedCode = code.toUpperCase();
        targetObj[normalizedCode] = (targetObj[normalizedCode] || 0) + quantity;
      });
    }
  }
  
  // Process existing items first
  processItems(existingItems, result);
  
  // Then merge in new items
  processItems(newItems, result);
  
  return result;
}
