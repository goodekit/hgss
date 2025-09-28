/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks      : true,
  coverageProvider: "v8",
  moduleNameMapper: {
    '^/(.*)$'                          : '<rootDir>/$1',
    'hgss'                             : '<rootDir>/config/global.config.ts',
    'hgss-dir'                         : '<rootDir>/config/dir/asset.ts',
    '^mailer$'                         : '<rootDir>/__mocks__/mailer.ts',
    '^next-auth$'                      : '<rootDir>/__mocks__/next-auth.ts',
    '^next-auth/providers/credentials$': '<rootDir>/__mocks__/next-auth-credentials.ts',
    '^next-auth/providers/google$'     : '<rootDir>/__mocks__/next-auth-google.ts',
    '^query-string$'                   : '<rootDir>/__mocks__/query-string.ts'
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  preset           : 'ts-jest',
  setupFiles       : ['<rootDir>/jest.setup.ts']
}

export default config;
