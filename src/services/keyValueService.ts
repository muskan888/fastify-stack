// Defines the structure of a key-value store entry
interface StoreEntry {
  value: string;        // The value associated with the key
  expiresAt?: number;   // Optional expiration timestamp (in milliseconds)
}

// In-memory store for key-value pairs, using a Map for efficient lookups
const store = new Map<string, StoreEntry>();

// Sets a key-value pair in the store with an optional TTL (time-to-live)
export const setKey = (key: string, value: string, ttl?: number): void => {
  // Create a new store entry with the provided value
  const entry: StoreEntry = { value };

  // If TTL is provided, calculate the expiration time in milliseconds
  if (ttl) {
    entry.expiresAt = Date.now() + ttl * 1000; // Convert seconds to milliseconds
  }

  // Store the entry in the Map under the given key
  store.set(key, entry);
};

// Retrieves the value for a key, respecting TTL if set
export const getKey = (key: string): string | null => {
  // Attempt to fetch the entry from the store
  const entry = store.get(key);

  // Return null if the key doesn’t exist
  if (!entry) return null;

  // Check if the entry has expired; if so, delete it and return null
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }

  // Return the value if the key exists and hasn’t expired
  return entry.value;
};

// Deletes a key-value pair from the store
export const deleteKey = (key: string): boolean => {
  // Remove the key from the store and return true if it existed, false otherwise
  return store.delete(key);
};

// Clears all entries from the store (for testing purposes)
export const clearStore = (): void => {
  // Remove all key-value pairs from the Map
  store.clear();
};