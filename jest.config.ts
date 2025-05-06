/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // A map from regular expressions to paths to transformers
  transform: {
    // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
    // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // настройки для ts-jest
      },
    ],
  },

  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Путь зависит от вашей структуры проекта
    '^@api': '<rootDir>/src/utils/burger-api.ts', // Измените этот путь в зависимости от реальной структуры проекта
    '^@utils-types': '<rootDir>/src/utils/types.ts', // Аналогично предыдущему пункту
  },

};

export default config;
