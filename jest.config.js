module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/tests/prismaSetup.ts'],
  };
  