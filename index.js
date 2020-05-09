const {STATUS_CODES} = require('http')

const statusCodes = Object.keys(STATUS_CODES).map(s => parseInt(s, 10))

module.exports = {
  root: true,
  plugins: [
    'prettier',
    'sonarjs',
    'security',
    'jest',
    'no-loops',
    'toplevel',
  ],
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
    'security/detect-object-injection': 'off',
    'no-console': ['warn', { 'allow': ['warn', 'error'] }],
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      trailingComma: 'es5',
    }],
    complexity: ['error', {
      max: 5
    }],
    'max-depth': ['error', 3],
    'prefer-const': ['error',{
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    }],
    'consistent-return': 'error',
    'no-warning-comments': ['warn'],
    'sonarjs/cognitive-complexity': ['error', 5],
    'sonarjs/no-duplicate-string': ['error', 5],

    // https://github.com/expressjs/generator/issues/78
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^(_|next)' }],
    'no-magic-numbers': ['error', {
      ignoreArrayIndexes: true,
      ignore: [
        -1,
        0,
        1,
        ...statusCodes
      ]
    }],
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'no-loops/no-loops': 'error',
    'toplevel/no-toplevel-side-effect': 'error',
    'unicorn/prevent-abbreviations': 'off',
    'dot-notation': 'error',
    'no-extra-semi': 'off',

    // IE11 Does not support `Number` static props
    'unicorn/prefer-number-properties': 'off',

    'unicorn/prefer-set-has': 'off'
  },
  overrides: [{
    files: ['*.test.js', '**/test/**', '**/__mocks__/**'],
    rules: {
      'no-magic-numbers': 'off',
      'toplevel/no-toplevel-side-effect': 'off',
    }
  }],
  env: {
    node: true,
    jest: true,
    es6: true
  }
}
