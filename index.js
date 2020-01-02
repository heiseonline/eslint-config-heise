const {STATUS_CODES} = require('http')

const statusCodes = Object.keys(STATUS_CODES).map(s => parseInt(s, 10))

module.exports = {
  root: true,
  plugins: ['prettier', 'sonarjs', 'security', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
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
    'consistent-return': ['error'],
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
  },
  overrides: [{
    files: ['*.test.js', 'test/'],
    rules: {
      'no-magic-numbers': 0
    }
  }],
  env: {
    node: true,
    jest: true,
    es6: true
  }
}
