# Nkp package template

Template for @nkp/ npm packages.

Comes with:

1. Language: TypeScript & JavaScript
2. Linting: Eslint
3. Testing: Jest
    - Support TypeScript test files
    - Support e2e and unit tests
    - Easy to configure for DOM testing
4. Building: Rollup
    1. Builds commonjs
    2. Builds ES Modules (targets package.json#module)
        - Package consumers using build tools such as `rollup` and `webpack` target package.json#module, the ES Module export of the package, for tree shaking. Tree shaking generates smaller packages and reduces build times.
5. CI: GitHub actions
    - Builds, tests and publishes to `npm` when a new release is created on GitHub.

## Getting started

1. Clone the repository
    - `git clone git@github.com:NickKelly1/nkp-template.git`
    - (optional): use GitHub's `template` feature.
2. Install dependencies and run tests
    1. run `npm install`
    2. run `npm test`
3. Replace placeholders in package.json
    1. Replace --PACKAGE_DESCRIPTION-- with the package's description
    2. Replace --NPM_PACKAGE_NAME-- with the package's name on NPM
    3. Replace --GITHUB_PACKAGE_NAME-- with the package's name on GitHub
    4. Replace --GIT_REPOSITORY-- with the GitHub repositories ssh clone url
4. Remove stubs and reset the repos state
    1. Delete `src/add.ts`
    2. Delete `src/add.spec.ts`
    3. Remove the contents of `src/index.ts`
    4. set the testEnvironment in `jest.config.ts
5. Add an NPM_TOKEN to the repository for CI
    1. Using npmjs, generate a CI token
    2. Add the token to this GitHub repositories secrets as "NPM_TOKEN"
6. Set up the README.MD
    1. Change @nkp---README_PACKAGE_NAME-- from a header-2 to a header-1 (`##` to `#`)
    2. replace --README_PACKAGE_NAME-- in `README.md` with the packages name
    3. Add a description to the package's `README.md`
    4. Delete the `# Nkp package template` and `## Getting Started` sections of the README.md

## @nkp---README_PACKAGE_NAME--

Description goes here

## Releasing a new version

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
