module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFiles: ["<rootDir>/src/__utils__/env.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/__utils__/utils.ts"]
}
