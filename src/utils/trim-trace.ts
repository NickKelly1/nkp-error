/**
 * Trim the stack trace of an error
 *
 * @param err
 * @param by
 */
export function trimTrace(err: Error, by = 1): void {
  const stack = err.stack?.split('\n');
  // first element is the errors name
  // second element is the trace at `coerceError`
  // rest is the callee of coerceError
  if (stack) err.stack = [stack[0], ...stack.splice(by + 1)].join('\n');
}
