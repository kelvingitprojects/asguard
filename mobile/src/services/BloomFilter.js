/**
 * Simple Bloom Filter implementation for efficient local lookup of stolen vehicle IDs.
 * This minimizes server pings by filtering out known "safe" IDs locally.
 */
export class BloomFilter {
  constructor(size = 1000, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Uint8Array(Math.ceil(size / 8));
  }

  // Simple hash functions (FNV-1a variant for JS)
  hash(value, seed) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = (hash * 0x01000193) ^ seed;
    }
    return Math.abs(hash) % this.size;
  }

  add(value) {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(value, i);
      const byteIndex = Math.floor(index / 8);
      const bitIndex = index % 8;
      this.bitArray[byteIndex] |= (1 << bitIndex);
    }
  }

  test(value) {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(value, i);
      const byteIndex = Math.floor(index / 8);
      const bitIndex = index % 8;
      if (!(this.bitArray[byteIndex] & (1 << bitIndex))) {
        return false;
      }
    }
    return true;
  }

  // Clear the filter
  clear() {
    this.bitArray.fill(0);
  }

  // Load data from server (simulated)
  loadFromHotList(hotListIds) {
    this.clear();
    hotListIds.forEach(id => this.add(id));
  }
}

export const stolenVehicleFilter = new BloomFilter();
