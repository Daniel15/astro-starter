import {includeIgnoreFile} from '@eslint/compat';
import astro from 'eslint-plugin-astro';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import css from '@eslint/css';
import {defineConfig, globalIgnores} from 'eslint/config';
import prettier from 'eslint-config-prettier';
import {resolve} from 'node:path';

export default defineConfig(
  includeIgnoreFile(resolve(import.meta.dirname, '.gitignore')),
  // Un-ignore virtual TypeScript files from <script> tags in Astro components.
  globalIgnores(['!.astro/**/*.ts']),
  css.configs.recommended,
  json.configs.recommended,
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        // Required to enable type-checked rules.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  astro.configs.recommended,
  // `client-side-ts` extracts <script> tags from Astro components.
  {
    files: ['**/*.astro'],
    processor: astro.processors['client-side-ts'],
  },

  // Disable type-checked rules in Astro components.
  // https://github.com/ota-meshi/eslint-plugin-astro/issues/447
  {
    files: ['**/*.astro', '**/*.astro/*.ts'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
  },
  prettier,
);
