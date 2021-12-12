module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/server/'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  globalSetup: '<rootDir>/server/__tests__/global-setup.js',
  globalTeardown: '<rootDir>/server/__tests__/global-teardown.js',
};
