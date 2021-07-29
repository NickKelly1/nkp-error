import { add } from './add';

describe('add', () => {
  it('should add 1 + 2 = 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  it('shouldn\'t add 1 + 2 = 4', () => {
    expect(add(1, 2)).not.toBe(4);
  });
});
