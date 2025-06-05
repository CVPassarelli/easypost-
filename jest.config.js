const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // CSS Modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Import aliases (ajuste se usar `@/`)
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
