import { coerceError } from './coerce-error';

describe('coerce-error', () => {
  beforeEach(() => {
    // ignore warnings
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should coerce non-errors to errors', () => {
    expect(coerceError('not an error')).toBeInstanceOf(Error);
    expect(coerceError(true)).toBeInstanceOf(Error);
    expect(coerceError(false)).toBeInstanceOf(Error);
    expect(coerceError(15)).toBeInstanceOf(Error);
    expect(coerceError(Math.PI)).toBeInstanceOf(Error);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(coerceError(() => {})).toBeInstanceOf(Error);
    expect(coerceError(null)).toBeInstanceOf(Error);
    expect(coerceError(undefined)).toBeInstanceOf(Error);
    expect(coerceError(Symbol('not an error'))).toBeInstanceOf(Error);
    expect(coerceError(new Date())).toBeInstanceOf(Error);
  });

  it('should preserve error-like objects', () => {
    const helloErrorOriginal = { message: 'hello world' };
    const helloError = coerceError(helloErrorOriginal);
    expect(helloError).toBeInstanceOf(Error);
    expect(helloError).toMatchObject(helloErrorOriginal);

    const codedErrorOriginal = { message: 'someting went wrong', code: 50 };
    const codedError = coerceError(codedErrorOriginal);
    expect(codedError).toMatchObject(codedErrorOriginal);
  });

  it('should not preserve non-error-like objects', () => {
    const original = { egassem: 'dlrow olleh' };
    const notErrorLike = coerceError(original);
    expect(notErrorLike).not.toMatchObject(original);
    expect(notErrorLike).toBeInstanceOf(Error);
  });

  it('should not clone objectfunctions', () => {
    const error = coerceError({
      message: 'with fns',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fn1() {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fn2: function() {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fn3: () => {},
    }) ;

    expect(error).toMatchObject({ message: 'with fns', });
    expect('fn1' in error).toBe(false);
    expect('fn2' in error).toBe(false);
    expect('fn3' in error).toBe(false);
  });

  it('should not touch instances of error', () => {
    const instance = new Error();
    const error = coerceError(instance);
    expect(instance).toStrictEqual(error);
  });
});
