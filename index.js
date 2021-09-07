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
    es2020: true,
    jest: false,
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    'sonarjs',
    'unicorn',
    'security',
    'node',
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
    'plugin:promise/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: 'tsconfig.json',
    extraFileExtensions: ['.mjs'],
    warnOnUnsupportedTypeScriptVersion: true,
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    'security/detect-object-injection': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': ['warn', prettierConfig],
    complexity: 'off',
    'curly': 'error',
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
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^(_|next)' }],
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
    'sonarjs/cognitive-complexity': ['error', 6],
    'sonarjs/no-duplicate-string': ['error', 5],
    'toplevel/no-toplevel-side-effect': 'error',
    '@typescript-eslint/no-extra-semi': 'off',
    // IE11 Does not support `Number` static props
    'unicorn/prefer-number-properties': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-module': 'off',
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: ['expect-puppeteer'],
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
      plugins: ['react'],
      extends: ['plugin:react/recommended'],
      settings: {
        react: {
          version: 'detect',
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
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'no-magic-numbers': 'off',
        'node/no-unpublished-import': 'off',
        'toplevel/no-toplevel-side-effect': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    // Top Level
    {
      files: ['**/main.ts', '**/www.ts', '**/*.js'],
      rules: {
        'toplevel/no-toplevel-side-effect': 'off',
      },
    },
  ],
}
