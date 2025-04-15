/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/$1',
    'hgss': '<rootDir>/config/global.ts'
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.ts']
}

export default config;
