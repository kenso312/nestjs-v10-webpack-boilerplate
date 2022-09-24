module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'unused-imports', // Auto remove unused imports
    'sort-imports-es6-autofix', // Auto sort the import order
    'prettier',
  ],
  extends: [
    // NestJS default extends
    'plugin:@typescript-eslint/recommended',
    // Airbnb-base depended plugin
    'plugin:import/recommended',
    // Support TypeScript [Import]
    'plugin:import/typescript',
    // If don't need React support, use base
    'airbnb-base',
    // Support TypeScript [Airbnb]
    'airbnb-typescript/base',
    // IMPORTANT: add this to the last of the extends to override ESLint rules
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // NestJS default rules
    '@typescript-eslint/interface-name-prefix': 'off',
    // NestJS default rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    // NestJS default rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // NestJS default rules
    '@typescript-eslint/no-explicit-any': 'off',
    // Conflict with unused-imports plugin
    '@typescript-eslint/no-unused-vars': 'off',
    // Allow underscore for special purpose
    'no-underscore-dangle': 'off',
    // Set the whitelist to allow reassign props since some case we must to reassign props
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['_opts'],
      },
    ],
    // Varialbes / Types naming rules
    '@typescript-eslint/naming-convention': [
      'error',
      // Enforce that all variables, functions and properties follow are camelCase
      {
        selector: 'variableLike',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        filter: {
          regex: '^npm_',
          match: false,
        },
      },
      // Enforce that boolean variables are prefixed with 'is' or 'has'
      // when added prefix, ESLint will trim the prefix and check the format, so PascalCase needed
      {
        selector: 'variable',
        format: ['PascalCase'],
        types: ['boolean'],
        prefix: ['is', 'has'],
        leadingUnderscore: 'allow',
      },
      // Allow that const variables can be UPPER_CASE or camelCase
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        filter: {
          regex: '^npm_',
          match: false,
        },
      },
      // Enforce that class, interface, type and enum  follow are PascalCase
      { selector: 'typeLike', format: ['PascalCase'] },
      // Enforce that interface names do not begin with an I
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
    ],
    // Example setting of unused-imports plugin
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Conflict with sort-imports-es6 plugin
    'import/order': 'off',
    // Example setting of sort-imports-es6 plugin
    'sort-imports-es6-autofix/sort-imports-es6': [
      'warn',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    // For Typescript, it is better not to use default export: https://stackoverflow.com/a/33307487/11440474
    'import/prefer-default-export': 'off',
    // Conflict with alias path
    'import/extensions': 'off',
    // Not enforce using 'this' in a class function since some function can be a pure function
    'class-methods-use-this': 'off',
  },
};
