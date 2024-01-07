const { join } = require('path');

/** @type {import('eslint').Linter.Config} */
const jsRules = {
  extends: [
    // ESLint recommended rules
    'eslint:recommended',
    // Airbnb JavaScript style
    'airbnb-base',
    // Auto sort objects, imports, types, enums, etc.
    'plugin:perfectionist/recommended-natural',
    // IMPORTANT: add this to the last of the extends to prevent conflict of ESLint rules
    'plugin:prettier/recommended',
  ],
  plugins: [
    'unused-imports', // Auto remove unused imports
  ],
  rules: {
    // Not enforce using 'this' in a class function since some function can be a pure function
    'class-methods-use-this': 'off',

    // Conflict with alias path
    'import/extensions': 'off',

    // Conflict with perfectionist sorting
    'import/order': 'off',

    // Controversial rules: https://github.com/airbnb/javascript/issues/1365
    'import/prefer-default-export': 'off',

    // Set the whitelist to allow reassign props since some case we must to reassign props
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['_opts'],
        props: true,
      },
    ],

    // Allow underscore for special purpose
    'no-underscore-dangle': 'off',

    // Example config of unused-imports plugin
    'unused-imports/no-unused-imports': 'warn',

    // Example config of unused-imports plugin
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    jest: true,
    node: true,
  },
  overrides: [
    {
      ...jsRules,
      files: ['*.js'],
    },
    {
      extends: [
        ...jsRules.extends,
        // Airbnb JavaScript style for TypeScript
        'airbnb-typescript/base',
        // ESLint recommended rules for TypeScript
        'plugin:@typescript-eslint/recommended',
        // IMPORTANT: add this to the last of the extends to prevent conflict of ESLint rules
        'plugin:prettier/recommended',
      ],
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: join(__dirname, 'tsconfig.json'),
        sourceType: 'module',
      },
      plugins: [...jsRules.plugins],
      rules: {
        ...jsRules.rules,

        // Better readability
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
            disallowTypeAnnotations: false,
          },
        ],

        // NestJS default rules
        '@typescript-eslint/explicit-function-return-type': 'off',

        // NestJS default rules
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // NestJS default rules
        '@typescript-eslint/interface-name-prefix': 'off',

        // Varialbes / Types naming rules
        '@typescript-eslint/naming-convention': [
          'error',
          /**
           * Enforce that all variables, functions and properties follow are camelCase or PascalCase
           */
          {
            filter: {
              match: false,
              regex: '^npm_',
            },
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            selector: 'variableLike',
          },
          /**
           * Enforce that boolean variables are prefixed with 'is' or 'has'
           * when added prefix, ESLint will trim the prefix and check the format, so PascalCase needed
           */
          {
            format: ['PascalCase'],
            leadingUnderscore: 'allow',
            prefix: ['is', 'has'],
            selector: 'variable',
            types: ['boolean'],
          },
          /**
           * Enforce that class, interface, type and enum follows are PascalCase
           */
          { format: ['PascalCase'], selector: 'typeLike' },
          /**
           * Enforce that interface names do not begin with an I
           */
          {
            custom: {
              match: false,
              regex: '^I[A-Z]',
            },
            format: ['PascalCase'],
            selector: 'interface',
          },
          { format: ['UPPER_CASE'], selector: 'enumMember' },
        ],

        // For declaring props interface
        '@typescript-eslint/no-empty-interface': 'off',

        // NestJS default rules
        '@typescript-eslint/no-explicit-any': 'off',

        // Conflict with unused-imports plugin
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        // Sort all the array values
        'jsonc/sort-array-values': [
          'warn',
          {
            order: { type: 'asc' },
            pathPattern: '.',
          },
        ],
        // Sort all the JSON key
        'jsonc/sort-keys': [
          'warn',
          {
            order: { type: 'asc' },
            pathPattern: '.',
          },
        ],
      },
    },
    {
      extends: ['plugin:yml/standard'],
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      parserOptions: {
        defaultYAMLVersion: '1.2',
      },
      rules: {
        // Sync with Prettier config
        'yml/quotes': [
          'error',
          {
            prefer: 'single',
          },
        ],
      },
    },
    {
      extends: ['plugin:markdown/recommended'],
      files: ['*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.md/*.js'],
      rules: {
        // Some example may have uninstalled import
        'import/no-unresolved': 'off',
      },
    },
  ],
  root: true,
};
