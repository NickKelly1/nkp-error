import * as exported from '../src/index';

describe('e2e', () => {
  it('exports the correct functions', () => {
    expect(exported.maybeError).toBeDefined();
    expect(exported.trimTrace).toBeDefined();
  });
});
