import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override for test files - disable Next.js rules
  {
    files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
    rules: {
      // Disable Next.js specific rules for test files
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-unwanted-polyfillio": "off",
      "@next/next/no-before-interactive-script-outside-document": "off",
      "@next/next/no-css-tags": "off",
      "@next/next/no-head-element": "off",
      "@next/next/no-head-import-in-document": "off",
      "@next/next/no-script-component-in-head": "off",
      "@next/next/no-styled-jsx-in-document": "off",
      "@next/next/no-title-in-document-head": "off",
      "@next/next/no-typos": "off",
      "@next/next/no-duplicate-head": "off",
      "@next/next/no-sync-scripts": "off",
      "@next/next/inline-script-id": "off",
      "@next/next/next-script-for-ga": "off",
      "@next/next/no-assign-module-variable": "off",
      "@next/next/no-document-import-in-page": "off",
      "@next/next/no-server-import-in-page": "off",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
