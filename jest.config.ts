import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import { swcDefaultsFactory } from '@nestjs/cli/lib/compiler/defaults/swc-defaults';

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  rootDir: '.',
  testRegex: '\\.spec\\.ts$',
  transform: {
    '^.+\\.[jt]s$': ['@swc/jest', swcDefaultsFactory().swcOptions],
  },
  testEnvironment: 'node',
};

export default jestConfig;
