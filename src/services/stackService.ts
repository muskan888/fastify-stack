const stack: string[] = [];

export const pushToStack = (item: string): void => {
  stack.push(item);
};

export const popFromStack = (): string | null => {
  return stack.pop() || null;
};