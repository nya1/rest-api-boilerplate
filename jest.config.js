const { resolve } = require('path');

module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./test/setup-jest.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': resolve(__dirname, './src/$1'),
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/app.ts',
    '!src/server.ts',
    '!src/util/logger.ts',
    '!src/util/config.ts',
    '!src/util/container.ts',
  ],
  testRegex: './test/unit/.*.ts$',
};
