/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Maybe } from '@nkp/maybe';
import { maybeError } from './maybe-error';

describe('maybeError', () => {
  beforeEach(() => {
    // ignore warnings
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should coerce non-errors to errors', () => {
    expect(maybeError('not an error')).toEqual(Maybe.none);
    expect(maybeError(true)).toEqual(Maybe.none);
    expect(maybeError(false)).toEqual(Maybe.none);
    expect(maybeError(15)).toEqual(Maybe.none);
    expect(maybeError(Math.PI)).toEqual(Maybe.none);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(maybeError(() => {})).toEqual(Maybe.none);
    expect(maybeError(null)).toEqual(Maybe.none);
    expect(maybeError(undefined)).toEqual(Maybe.none);
    expect(maybeError(Symbol('not an error'))).toEqual(Maybe.none);
    expect(maybeError(new Date())).toEqual(Maybe.none);
  });

  it('should preserve error-like objects', () => {
    const helloErrorOriginal = { message: 'hello world' };
    const helloError = maybeError(helloErrorOriginal);
    expect(helloError.isSome()).toEqual(true);
    expect(helloError.value).toBeInstanceOf(Error);
    expect(helloError.value).toMatchObject(helloErrorOriginal);

    const codedErrorOriginal = { message: 'someting went wrong', code: 50 };
    const codedError = maybeError(codedErrorOriginal);
    expect(codedError.isSome()).toEqual(true);
    expect(codedError.value).toMatchObject(codedErrorOriginal);
  });

  it('should not convert non-error-like objects', () => {
    const original = { egassem: 'dlrow olleh' };
    const notErrorLike = maybeError(original);
    expect(notErrorLike.isNone()).toEqual(true);
  });

  it('should not clone objectfunctions', () => {
    const error = maybeError({
      message: 'with fns',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fn1() {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fn2: function() {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fn3: () => {},
    }) ;

    expect(error.isSome()).toEqual(true);
    expect(error.value).toMatchObject({ message: 'with fns', });
    expect('fn1' in error.value!).toBe(false);
    expect('fn2' in error.value!).toBe(false);
    expect('fn3' in error.value!).toBe(false);
  });

  it('should not touch instances of error', () => {
    const instance = new Error();
    const error = maybeError(instance);
    expect(error.isSome()).toEqual(true);
    expect(error.value).toStrictEqual(instance);
    expect(error.value).toStrictEqual(instance);
  });
});
