import { setKey, getKey, deleteKey, clearStore } from '../src/services/keyValueService';

describe('Key-Value Store', () => {
  beforeEach(() => {
    clearStore(); // Clear the store before each test
  });

  it('should set and get keys without TTL', () => {
    setKey('name', 'John');
    expect(getKey('name')).toBe('John');
    expect(getKey('age')).toBeNull();
  });

  it('should respect TTL', async () => {
    setKey('name', 'Larry', 1); // 1 second TTL
    expect(getKey('name')).toBe('Larry');
    await new Promise((resolve) => setTimeout(resolve, 1100)); // Wait > 1s
    expect(getKey('name')).toBeNull();
  });

  it('should delete keys', () => {
    setKey('name', 'John');
    expect(deleteKey('name')).toBe(true);
    expect(getKey('name')).toBeNull();
    expect(deleteKey('nonexistent')).toBe(false);
  });
});