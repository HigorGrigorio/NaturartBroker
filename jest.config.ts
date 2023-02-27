export default {
    roots: ['<rootDir>/tests', '<rootDir>/src'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        '@tests/(.*)': '<rootDir>/tests/$1',
        '@/(.*)': '<rootDir>/src/$1',
        '@core/(.*)': '<rootDir>/src/core/$1',
        '@domain/(.*)': '<rootDir>/src/domain/$1',
        '@application/(.*)': '<rootDir>/src/application/$1',
        '@infra/(.*)': '<rootDir>/src/infra/$1',
        '@config/(.*)': '<rootDir>/src/config/$1',
    },
};
