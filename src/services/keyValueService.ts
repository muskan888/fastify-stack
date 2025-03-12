interface StoreEntry {
  value: string;
  expiresAt?: number;
}

const store = new Map<string, StoreEntry>();

export const setKey = (key: string, value: string, ttl?: number): void => {
  const entry: StoreEntry = { value };
  if (ttl) {
    entry.expiresAt = Date.now() + ttl * 1000;
  }
  store.set(key, entry);
};

export const getKey = (key: string): string | null => {
  const entry = store.get(key);
  if (!entry) return null;
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
};

export const deleteKey = (key: string): boolean => {
  return store.delete(key);
};

// Add this for testing purposes
export const clearStore = (): void => {
  store.clear();
};