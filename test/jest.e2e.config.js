/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

const env = require('fs')
  .readFileSync('.env', 'utf8')
  .split('\n')
  .reduce((result, i) => {
    const [variable, value] = i.split('=');
    // eslint-disable-next-line no-param-reassign
    result[variable] = value;
    return result;
  }, {});

process.env = Object.assign(process.env, env);
