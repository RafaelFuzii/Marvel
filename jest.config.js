module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            isolateModules: true
        }
    },
    clearMocks: true,
    coverageProvider: 'v8',
    coverageThreshold: {  // Corrigido de "coverageTrashold" para "coverageThreshold"
        global: {
            functions: 80,  // Corrigido de "function" para "functions"
            lines: 80,
            statements: 80
        }
    },
    testPathIgnorePatterns: ['./dist/*']
}
