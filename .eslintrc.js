// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true, // Enable browser globals (e.g., window, document)
    node: true, // Enable Node.js globals (e.g., module, require)
    es2021: true, // Enable ECMAScript 2021 features
  },
  globals: {
    module: 'readonly', // Explicitly define 'module' as a readonly global
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Optional: integrate Prettier for code formatting
    'plugin:import/errors', // Ensures proper import usage
    'plugin:import/warnings', // Warnings for imports
    'plugin:import/typescript', // If you're using TypeScript
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX syntax
    },
  },
  rules: {
    'react/prop-types': 'off', // Disable prop-types if you're using TypeScript or other methods for type-checking
    'react/react-in-jsx-scope': 'off', // React 17+ no longer needs React in scope for JSX
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always', // Ensure new lines between groups
        alphabetize: {
          order: 'asc', // Alphabetical order for imports
          caseInsensitive: true, // Case-insensitive alphabetical order
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
};
