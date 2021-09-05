import { Config } from '@jest/types';

// eslint-disable-next-line no-undef
export default async (): Promise<Config.InitialOptions> => ({
  // verbose: true,

  rootDir: '../',

  // if not using javascript files, use "ts-jest" instead
  // preset: 'ts-jest',
  preset: 'ts-jest/presets/js-with-ts-esm',

  roots: [
    '<rootDir>/src',
    '<rootDir>/__tests__',
  ],

  coveragePathIgnorePatterns: ['.spec.util.ts',],

  coverageDirectory: '<rootDir>/coverage',

  // for DOM related:
  // testEnvironment: 'jsdom',

  // https://stackoverflow.com/questions/50411719/shared-utils-functions-for-testing-with-jest/52910794
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/config/tsconfig.spec.json',

      // if not using javscript files, remove the following:
      useESM: true,
      extensionsToTreatAsESM: ['.js', '.ts', '.tsx', '.jsx',],
    },
  },

  // https://www.carlrippon.com/using-jest-and-rtl-with-react-typescript/
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.setup.ts',
  ],

  modulePathIgnorePatterns: [
    '/node_modules/',
  ],
});
