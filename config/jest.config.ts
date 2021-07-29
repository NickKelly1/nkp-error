import { Config } from '@jest/types';

// eslint-disable-next-line no-undef
export default async (): Promise<Config.InitialOptions> => ({
  // verbose: true,

  rootDir: '../',

  preset: 'ts-jest',

  // for DOM related:
  // testEnvironment: 'jsdom',

  // https://stackoverflow.com/questions/50411719/shared-utils-functions-for-testing-with-jest/52910794
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/config/tsconfig.spec.json',
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
