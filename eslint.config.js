import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
export default tseslint.config(
  { ignores: ['dist', '.ssr', 'node_modules', 'playwright-report', 'test-results'] },
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        AbortSignal: 'readonly',
        URL: 'readonly',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/set-state-in-effect': 'off',
    },
  },
);
