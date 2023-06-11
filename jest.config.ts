import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  rootDir: '.',
  testRegex: '\\.spec\\.ts$',
  transform: {
    '^.+\\.[jt]s$': 'ts-jest',
  },
  testEnvironment: 'node',
};

export default jestConfig;
