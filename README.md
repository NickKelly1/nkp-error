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

### With script tags

```html
<head>
  <!-- insert your desired version -->
  <script src="https://unpkg.com/browse/@nkp/error@0.0.4/"></script>
</head>

```

## Usage

```ts
try {
  doSomeWork();
} catch (_err) {
  const err = coerceError(_err);
  console.log('Error:', err);
}
```

## Notes

`coerceError` does its best to maintain the stack trace of the thrown error.

If a non `Error` instance is thrown then JavaScript cannot infer the call-stack for it. For example:

``` ts
try { throw 'untraceable'; }
catch(error) { assert(typeof error === 'string')
```

in this case, since a `string` is thrown and not an `Error` instance, there is no way to obtain the stack trace from the thrown point. Instead, `coerceError` will start the stack trace in the `catch` block.

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

A GitHub action will test and publishes the npm package. Note, the `dist` folder is published.
