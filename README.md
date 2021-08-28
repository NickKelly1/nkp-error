# @nkp/error

[![npm version](https://badge.fury.io/js/%40nkp%2Ferror.svg)](https://badge.fury.io/js/%40nkp%2Ferror)
[![Node.js Package](https://github.com/NickKelly1/nkp-error/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/NickKelly1/nkp-error/actions/workflows/npm-publish.yml)
![snyk](https://snyk-widget.herokuapp.com/badge/npm/%40nkp%2Ferror/badge.svg)

Coerce an unknown error into an instance of the Error class.

## Installation

This package exports as CommonJS (default), ES Modules, and UMD.

For ES Modules and tree shaking use a bundler that supports ES modules such as [rollup](https://rollupjs.org/guide/en/) or [webpack](https://webpack.js.org/).

### With npm

```sh
npm install @nkp/error
```

## Usage

### On `Error` instances

When an instance of `Error` is thrown, coerceError does nothing

```ts
import { coerceError } from '@nkp/error';

function doWork() {
  throw new Error('something went wrong');
}
try {
  doWork();
} catch (_err: unknown) {
  const err: Error = coerceError(_err);
  console.error(err);
  // Error: something went wrong
  //   at doWork (...
  //   at ...
}
```

### On Non `Error` Instance

`coerceError` does its best to maintain the stack trace of the thrown error.

If a non `Error` instance is thrown then JavaScript cannot infer the call-stack for it. For example:

``` ts
import { coerceError } from '@nkp/error';
const message =  'untraceable';
try {
  // throw a string instead of of an Error instance
  throw message;
}
catch(_error) {
  console.log(typeof _error); // 'string'
  const error = coerceError(_error);
  console.log(error.message === message); // true
}
```

in this case, since a `string` is thrown and not an `Error` instance, there is no way to obtain the stack trace from the thrown point. Instead, `coerceError` will start the stack trace in the `catch` block.

### On Error-like Objects

An error-like object is one with a string `message` property.

Error-like objects that don't inherit from `Error` have their non-function properties (& properties from their prototype chain except `Object.prototype`) shallow copied onto a new Error instance. Function properties are not copied because copying bound functions may cause confusion when if mutating the error objects.

```ts
const throwable = {
  message: 'someting went wrong',
  code: 50,
  fn: () => {},
};
try {
  throw throwable;
} catch (_error) {
  const error = coerceError(_error);
  console.log(throwable === error); // false;
  console.log(error instanceof Error); // true
  console.log((error as any).code === 50); // true
  console.log(!('fn' in error)); // true
}
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

A GitHub action run use `npm-publish.yml` to test and publish the npm package. Note, the `dist` folder is published.
