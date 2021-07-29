# @nkp/error

Coerce an unknown error into an instance of the Error class

## Examples

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

## Releasing a new version

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
