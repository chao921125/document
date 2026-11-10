/**
 * https://jestjs.io/docs/zh-Hans/configuration
 */
module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', 'node_modules'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ['src/*.{js,ts}'],
};
