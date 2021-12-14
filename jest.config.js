module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>', 'src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  setupFiles: ['<rootDir>/src/__utils__/env.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/__utils__/utils.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@vanilladefi/trade-contracts)/)',
    '\\.pnp\\.[^\\/]+$',
  ],
}
