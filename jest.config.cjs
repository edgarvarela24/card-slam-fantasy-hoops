module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    './config': '<rootDir>/src/firebase/__mocks__/config.ts',
    '^../AuthStatus$': '<rootDir>/src/components/__mocks__/AuthStatus.tsx',
    '^@testing-library/react$': '<rootDir>/src/__mocks__/@testing-library/react.js',
    '^@testing-library/jest-dom$': '<rootDir>/src/__mocks__/@testing-library/jest-dom.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: false,
      tsconfig: 'tsconfig.test.json',
    }],
  },
  modulePathIgnorePatterns: ['<rootDir>/card-slam-fantasy-hoops/'],
  transformIgnorePatterns: [
    'node_modules/(?!(firebase|@firebase)/.*)'
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/src/suppressWarnings.js',
    '<rootDir>/src/testSetup.js', 
    '<rootDir>/src/setupTests.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.js', '<rootDir>/src/setupTests.ts'],
  haste: {
    forceNodeFilesystemAPI: true,
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};