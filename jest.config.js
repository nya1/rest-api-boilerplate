const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./test/setup-jest.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': resolve(__dirname, './src/$1'),
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/app.ts',
    '!src/server.ts',
    '!src/index.ts',
    '!src/util/logger.ts',
    '!src/util/config.ts',
    '!src/util/container.ts',
  ],
};
