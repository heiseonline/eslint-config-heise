const fs = require('fs')
const path = require('path')

const projectPath = fs.realpathSync(process.cwd())

let prettierConfig = {}
try {
  prettierConfig = require(path.join(projectPath, '.prettierrc'))
} catch (error) {
  prettierConfig = require('./.prettierrc')
}

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: false,
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    'sonarjs',
    'unicorn',
    'security',
    'node',
    'jest',
    'react',
    'promise',
    'toplevel',
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:react/recommended',
    'plugin:promise/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: 'tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: true,
    ecmaFeatures: {
      jsx: false,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'security/detect-object-injection': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': ['warn', prettierConfig],
    complexity: [
      'error',
      {
        max: 5,
      },
    ],
    'max-depth': ['error', 3],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'consistent-return': 'error',
    'no-warning-comments': ['warn'],
    // https://github.com/expressjs/generator/issues/78
    'no-unused-vars': ['error', { argsIgnorePattern: '^(_|next)' }],
    'no-magic-numbers': [
      'error',
      {
        ignoreArrayIndexes: true,
        ignore: [-1, 0, 1],
      },
    ],
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'dot-notation': 'error',
    'no-extra-semi': 'off',
    'jest/expect-expect': [
      'error',
      {
        // Anpassung für SuperTest
        assertFunctionNames: ['expect', 'request.*.expect'],
      },
    ],
    'node/no-missing-import': [
      'error',
      {
        // Anpassung für TypeScript
        tryExtensions: ['.js', '.json', '.node', '.jsx', '.ts', '.tsx'],
      },
    ],
    'sonarjs/cognitive-complexity': ['error', 5],
    'sonarjs/no-duplicate-string': ['error', 5],
    'toplevel/no-toplevel-side-effect': 'error',
    '@typescript-eslint/no-extra-semi': 'off',
    // IE11 Does not support `Number` static props
    'unicorn/prefer-number-properties': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        checkShorthandImports: true,
        checkShorthandProperties: true,
        checkProperties: true,
        checkVariables: true,
        checkFilenames: false,
      },
    ],
  },
  overrides: [
    // TypeScript
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Anpassung für TypeScript
        'node/no-unsupported-features/es-syntax': 'off',
      },
    },
    // React
    {
      files: ['**/*.jsx', '**/*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // Tests
    {
      files: [
        '**/*.test.js',
        '**/*.spec.js',
        '**/*.e2e-spec.js',
        '**/*.test.jsx',
        '**/*.spec.jsx',
        '**/*.e2e-spec.jsx',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.e2e-spec.ts',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        '**/*.e2e-spec.tsx',
        '**/__tests__/**',
        '**/__mocks__/**',
      ],
      env: {
        jest: true,
      },
      rules: {
        'no-magic-numbers': 'off',
        'node/no-unpublished-import': 'off',
        'toplevel/no-toplevel-side-effect': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
      },
    },
    // Top Level
    {
      files: ['**/main.ts', '**/www.ts'],
      rules: {
        'toplevel/no-toplevel-side-effect': 'off',
      },
    },
  ],
}
