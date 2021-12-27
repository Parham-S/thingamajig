module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  roots: ['<rootDir>/server/src/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.server.json',
      diagnostics: false,
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  modulePathIgnorePatterns: [
    '<rootDir>/server/src/__tests__/global-setup.ts',
    '<rootDir>/server/src/__tests__/global-teardown.ts',
  ],
  globalSetup: '<rootDir>/server/src/__tests__/global-setup.ts',
  globalTeardown: '<rootDir>/server/src/__tests__/global-teardown.ts',
};
