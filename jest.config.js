module.exports = {
    moduleNameMapper: {
        '@core/(.*)': '<rootDir>/src/app/core/$1',
    },
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/jest/setup-jest.ts'],
    testMatch: ["**/*.spec.ts"],
    modulePathIgnorePatterns: ["<rootDir>/cypress"]
};