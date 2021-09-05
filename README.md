# @nkp/error

[![npm version](https://badge.fury.io/js/%40nkp%2Ferror.svg)](https://badge.fury.io/js/%40nkp%2Ferror)
[![Node.js Package](https://github.com/NickKelly1/nkp-error/actions/workflows/release.yml/badge.svg)](https://github.com/NickKelly1/nkp-error/actions/workflows/release.yml)
![snyk](https://snyk-widget.herokuapp.com/badge/npm/%40nkp%2Ferror/badge.svg)

Take unknonwn types and coerce them to instances of the native JavaScript Error class.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [Exports](#exports)
- [Usage](#usage)
  - [maybeError](#maybeerror)
  - [alwaysError](#alwayserror)

## Installation

### NPM

```sh
npm install @nkp/error
```

### Yarn

```sh
yarn add @nkp/error
```

### Exports

`@nkp/error` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Usage

### maybeError

`maybeError` tries to coerce to an Error instance but fail (return a `None` instance) if the value is not error-like.

`maybeError` returns a `Maybe` instance from the library `@nkp/maybe` which allows easy handling of coercion failure cases.

If `maybeError` fails it returns a `None` instance. Otherwise it returns a `Some` instance.

```ts
import { Maybe } from '@nkp/maybe';

function maybeError(oldError: unknown): Maybe<Error>;
```

```ts
import { maybeError, ErrorLike } from '@nkp/error';

try {
  throw { message: 'something went wrong', } ErrorLike; 
} catch (_err: unknown) {
  maybeError(_err)
    // if failed to coerce, log the failure and create a new error instead
    .tapNone(() => console.warn('Warning: unknown error', _err))
    .mapNone(() => new Error('unknown error'))
    .throw();
}
```

### alwaysError

`alwaysError` always returns an `Error` instance. If the value was not `Error` like, the returned `Error` will attempt string conversion or note it could not deserialise string.

```ts
import { alwaysError } from '@nkp/error';

try {
  throw 'something went wrong';
} catch (_err: unknown) {
  throw alwaysError(_err);
}
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

A GitHub action run use `npm-publish.yml` to test and publish the npm package. Note, the `dist` folder is published.
