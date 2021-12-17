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
  globalSetup: '<rootDir>/server/src/__tests__/global-setup.ts',
  globalTeardown: '<rootDir>/server/src/__tests__/global-teardown.ts',
};
