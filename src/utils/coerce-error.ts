/* eslint-disable @typescript-eslint/no-explicit-any */
import { trimTrace } from './trim-trace';

/**
 * Coerce an unknown type into an error instance
 *
 * @param oldError
 */
export function coerceError(oldError: unknown): Error {
  // nullabke
  if (!oldError) {
    const newError = new Error('unknown error');
    console.warn('WARNING: unable to deserialise error', oldError);
    trimTrace(newError);
    return newError;
  }

  // non-object
  if (typeof oldError !== 'object') {
    const newError = new Error(String(oldError));
    console.warn('WARNING: unexpected error type', oldError);
    trimTrace(newError);
    return newError;
  }

  // is error
  if (oldError instanceof Error) {
    return oldError;
  }

  // error-like
  if (typeof (oldError as any).message === 'string') {
    const newError = new Error((oldError as any).message);
    if (typeof (oldError as any).stack === 'string') {
      newError.stack = (oldError as any).stack;
    } else {
      trimTrace(newError);
    }
    // shallow clone non function keys onto the new error
    // can't safely copy functions because we don't know whether they're
    // bound
    for (const key in oldError) {
      if (!(key in newError)
        && typeof (oldError as any)[key] !== 'function'
      ) {
        (newError as any)[key] = (oldError as any)[key];
      }
    }
    return newError;
  }

  console.warn('WARNING: unexpected error shape', oldError);
  const newError = new Error('unknown error');
  trimTrace(newError);
  return newError;
}
