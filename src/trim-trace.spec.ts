import { trimTrace } from './trim-trace';

describe('trim-trace', () => {
  beforeEach(() => {
    // ignore warnings
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  function oneDeep(): void { twoDeep(); }
  function twoDeep(): void { threeDeep(); }
  function threeDeep(): void { throw new Error(); }

  it('should trim stack traces', () => {
    try {
      oneDeep();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const preStack = (error as Error).stack!.split('\n');
      expect(preStack).toBeDefined();

      trimTrace(error as Error, 1);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const postStack = (error as Error).stack!.split('\n');
      expect(postStack).toBeDefined();

      expect(preStack[0]).toBe('Error: ');
      expect(preStack[1]).toMatch(new RegExp(`^ +at ${threeDeep.name}`));
      expect(preStack[2]).toMatch(new RegExp(`^ +at ${twoDeep.name}`));
      expect(preStack[3]).toMatch(new RegExp(`^ +at ${oneDeep.name}`));

      expect(postStack[0]).toBe('Error: ');
      expect(postStack[1]).toMatch(new RegExp(`^ +at ${twoDeep.name}`));
      expect(postStack[2]).toMatch(new RegExp(`^ +at ${oneDeep.name}`));
    }
  });
});
