import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.*controller.*\\.ts$',
    '.*dto.*\\.ts$',
    '.*strategy.*\\.ts$',
  ],
  testEnvironment: 'node',
};

export default config;
