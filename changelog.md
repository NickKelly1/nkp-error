# Changelog

## 0.0.4 - 2021-06-29

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

## 0.0.2 - 2021-06-29

Re-release

## 0.0.1 - 2021-06-29

### Added

- `coerceError`
- `trimTrace`

### Changed

### Removed
