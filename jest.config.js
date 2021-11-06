"use strict";
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/src/views/__test__/mock/CssLoaderMock.jest.js'
    },
    testMatch: [
        // "**/__tests__/Prd.test.js"
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
};
