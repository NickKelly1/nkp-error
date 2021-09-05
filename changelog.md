# Changelog

## 0.0.13 - 2021-09-05

### Changed

- Updated readme.md

## 0.0.12 - 2021-09-05

### Changed

- Updated readme.md

### Added

## 0.0.11 - 2021-09-05

### Added

- Added `maybeError`
- Added tests for `maybeError`
- Added `@nkp/maybe` as a dependency

### Changed

- Changed `coerceError` to `alwaysError`
- Updated readme.md
- Updated dependencies
- Updated project build and testing configuration

## 0.0.9 - 2021-08-27

### Changed

- No longer minify exports
- Updated tsconfig.json
- Updated tsconfig.build.json
- Updated jest.config.ts
- Updated dependencies
- Updated release.yml

## 0.0.8 - 2021-08-13

### Changed

- Added `"sideEffects": false` to `package.json`. Allows tree shaking in bundlers.

## 0.0.7 - 2021-07-29

Re-release

## 0.0.6 - 2021-07-29

### Changed

- Upgraded readme
- Added tests for readme examples
- Minified export

## 0.0.5 - 2021-07-29

### Changed

- Fixed README.md in npmjs.

## 0.0.4 - 2021-07-29

### Added

- UMD exports

### Changed

- Instead of the root folder, the `dist` folder is now published. The published project structure is now:
  - d: dist (published)
    - f: LICENSE
    - f: package.json
    - d: es (project as es modules)
    - d: cjs (project as cjs)
    - d: umd (project as umd)
- Updated readme with badges and more information.
- Temporarily disabled terser rollup plugin. Builds will temporarily not minified.

## 0.0.2 - 2021-07-29

Re-release

## 0.0.1 - 2021-07-29

### Added

- `coerceError`
- `trimTrace`

### Changed

### Removed
