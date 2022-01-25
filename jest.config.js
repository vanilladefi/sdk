/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['<rootDir>', 'node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  silent: false,
  transformIgnorePatterns: [
    "node_modules/(?!(@vanilladefi/trade-contracts)/)",
  ],
  setupFiles: [
    "<rootDir>/utils.ts"
  ]
};
