/* eslint-disable @typescript-eslint/no-explicit-any */
import { trimTrace } from './trim-trace';
import { Maybe } from '@nkp/maybe';

/**
 * Coerce an unknown type into an error instance
 *
 * @param oldError
 */
export function maybeError(oldError: unknown): Maybe<Error> {
  // nullable
  if (!oldError) {
    return Maybe.none;
  }

  // non-object
  if (typeof oldError !== 'object') {
    return Maybe.none;
  }

  // is error
  if (oldError instanceof Error) {
    return Maybe.some(oldError);
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
    return Maybe.some(newError);
  }

  return Maybe.none;
}
