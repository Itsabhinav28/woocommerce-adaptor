module.exports = {
    moduleNameMapper: {
      "^../config$": "<rootDir>/config/config.js",
      "^../utils/(.*)$": "<rootDir>/utils/$1"
    },
    testEnvironment: 'node',
    roots: ['<rootDir>/test']
  };