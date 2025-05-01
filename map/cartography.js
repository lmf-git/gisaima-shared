// Define CHUNK_SIZE constant for consistent usage across systems
export const CHUNK_SIZE = 20;

/**
 * Calculate chunk key from coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {string} Chunk key in format "chunkX,chunkY"
 */
export function getChunkKey(x, y) {
  // Simple integer division works for both positive and negative coordinates
  const chunkX = Math.floor(x / CHUNK_SIZE);
  const chunkY = Math.floor(y / CHUNK_SIZE);
  return `${chunkX},${chunkY}`;
}