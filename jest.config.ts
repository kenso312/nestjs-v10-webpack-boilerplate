import type { JestConfigWithTsJest } from 'ts-jest';

import { swcDefaultsFactory } from '@nestjs/cli/lib/compiler/defaults/swc-defaults';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '\\.spec\\.ts$',
  transform: {
    '^.+\\.[jt]s$': ['@swc/jest', swcDefaultsFactory().swcOptions],
  },
};

export default jestConfig;
