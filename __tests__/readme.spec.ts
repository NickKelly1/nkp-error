/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { coerceError } from '../src/index';

describe('readme examples should work', () => {
  beforeEach(() => {
    // ignore warnings
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('On `Error` Instances', () => {
    function doWork() {
      throw new Error('something went wrong');
    }
    try {
      doWork();
    } catch (_err: unknown) {
      const err: Error = coerceError(_err);
      expect(err.stack).toMatch(/^ *Error: something went wrong/);
      // Error: something went wrong
      //   at doWork (...
      //   at ...
    }
  });

  it('On Non `Error` Instances', () => {
    const message = 'untraceable';
    try {
      // throw a string instead of of an Error instance
      throw message;
    }
    catch(_error) {
      expect(typeof _error).toBe('string'); // 'string'
      const error = coerceError(_error);
      expect(error.message === message).toBe(true); // true
    }
  });

  it('On Error-like objects', () => {
    try {
      throw {
        message: 'someting went wrong',
        code: 50,
        fn: () => {},
      };
    } catch (_error) {
      const error = coerceError(_error);
      expect(error instanceof Error).toBe(true); // true
      expect((error as any).code).toBe(50); // true
      expect(!('fn' in error)).toBe(true); // true
    }
  });
});
