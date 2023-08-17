import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../tsconfig.json';
import { swcDefaultsFactory } from '@nestjs/cli/lib/compiler/defaults/swc-defaults';

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.[jt]s$': ['@swc/jest', swcDefaultsFactory().swcOptions],
  },
};

export default jestConfig;
