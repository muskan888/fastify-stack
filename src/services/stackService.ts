const stack: string[] = [];

export function pushToStack(item: string): void {
  stack.push(item);
}

export function popFromStack(): string | null {
  return stack.length > 0 ? stack.pop()! : null;
}
