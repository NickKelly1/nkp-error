import { alwaysError } from './always-error';

describe('alwaysError', () => {
  beforeEach(() => {
    // ignore warnings
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should coerce non-errors to errors', () => {
    expect(alwaysError('not an error')).toBeInstanceOf(Error);
    expect(alwaysError(true)).toBeInstanceOf(Error);
    expect(alwaysError(false)).toBeInstanceOf(Error);
    expect(alwaysError(15)).toBeInstanceOf(Error);
    expect(alwaysError(Math.PI)).toBeInstanceOf(Error);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(alwaysError(() => {})).toBeInstanceOf(Error);
    expect(alwaysError(null)).toBeInstanceOf(Error);
    expect(alwaysError(undefined)).toBeInstanceOf(Error);
    expect(alwaysError(Symbol('not an error'))).toBeInstanceOf(Error);
    expect(alwaysError(new Date())).toBeInstanceOf(Error);
  });

  it('should preserve error-like objects', () => {
    const helloErrorOriginal = { message: 'hello world', };
    const helloError = alwaysError(helloErrorOriginal);
    expect(helloError).toBeInstanceOf(Error);
    expect(helloError).toMatchObject(helloErrorOriginal);

    const codedErrorOriginal = { message: 'someting went wrong', code: 50, };
    const codedError = alwaysError(codedErrorOriginal);
    expect(codedError).toMatchObject(codedErrorOriginal);
  });

  it('should not preserve non-error-like objects', () => {
    const original = { egassem: 'dlrow olleh', };
    const notErrorLike = alwaysError(original);
    expect(notErrorLike).not.toMatchObject(original);
    expect(notErrorLike).toBeInstanceOf(Error);
  });

  it('should not clone objectfunctions', () => {
    const error = alwaysError({
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
    const error = alwaysError(instance);
    expect(instance).toStrictEqual(error);
  });
});
