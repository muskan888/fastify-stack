import { pushToStack, popFromStack } from '../src/services/stackService';

describe('Stack Service', () => {
  beforeEach(() => {
    while (popFromStack() !== null); // Clear stack before each test
  });

  it('should add and retrieve items in LIFO order', () => {
    pushToStack('Hello');
    pushToStack('World');
    expect(popFromStack()).toBe('World');
    pushToStack('Again');
    expect(popFromStack()).toBe('Again');
    expect(popFromStack()).toBe('Hello');
    expect(popFromStack()).toBeNull();
  });
});