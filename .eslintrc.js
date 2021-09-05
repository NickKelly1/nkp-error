'use-strict';

/* eslint-env node */

/** @typedef {import('eslint').Linter.Config} Config */

/** @type {Config} */
const config = {
  ignorePatterns: ['dist/*', 'node_modules/*',],
  overrides: [
    {
      files: ['*.js', '*.jsx',],
      'rules': {
        // doesn't work on .js files
        '@typescript-eslint/explicit-module-boundary-types': ['off',],
      },
    },
  ],
  'env': {
    // chose which are appropriate
    'browser': false,
    'node': false,

    'es2021': true,
    'jest': true,
  },
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'eslint:recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2021,
    'sourceType': ['module', 'commonjs',],
    'ecmaFeatures': {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  'plugins': [
    '@typescript-eslint',
  ],
  rules: {
    'indent': ['error', 2, ],
    'linebreak-style': ['error', 'unix',],
    'quotes': ['error', 'single',],
    'semi': ['error', 'always',],
    'comma-dangle': ['error', {
      'functions': 'only-multiline',
      'objects': 'always',
      'arrays': 'always',
    },],
    'no-dupe-class-members': ['off',], // allow ts function overloading
    'prefer-arrow-callback': ['off',],
    'import/no-commonjs': ['off',],
    'max-len': ['error', { code: 120, },],
    'no-unused-vars': ['off',], // favour typescript's no-unused-vars
    'no-undef': ['off',], // favour typescript
    'no-redeclare': ['off',], // favour typescript
    'no-trailing-spaces': ['error',],
    'eqeqeq': ['error', 'smart',],
    '@typescript-eslint/ban-ts-comment': ['off',],
    '@typescript-eslint/no-non-null-assertion': ['off',],
    '@typescript-eslint/no-this-alias': ['off',],
  },
};

module.exports = config;
