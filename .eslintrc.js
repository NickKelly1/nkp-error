// eslint-disable-next-line no-undef
module.exports = {
  // "ignorePatterns": ["**/*"],
  'ignorePatterns': ['dist/*'],
  'overrides': [
    {
      'files': ['*.ts', '*.tsx', '*.js', '*.jsx'],
      'env': {
        'browser': true,
        'es2021': true
      },
      'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 'react-app',
        // 'react-app/jest',
      ],
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
      },
      'plugins': [
        '@typescript-eslint'
      ],
      rules: {
        'indent': [
          'error',
          2
        ],
        'linebreak-style': [
          'error',
          'unix'
        ],
        'quotes': [
          'error',
          'single'
        ],
        'semi': [
          'error',
          'always'
        ]
      },
    },
    // {
    //   "files": ["*.ts", "*.tsx"],
    //   "extends": [],
    //   "rules": {}
    // },
    // {
    //   "files": ["*.js", "*.jsx"],
    //   "extends": [],
    //   "rules": {}
    // }
  ],
};
