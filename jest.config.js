module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>', 'src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  setupFiles: ['<rootDir>/src/__utils__/env.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/__utils__/utils.ts'],
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@vanilladefi/trade-contracts)/)',
    '\\.pnp\\.[^\\/]+$',
  ],
}
