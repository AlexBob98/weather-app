module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 'first' },
        FunctionExpression: { parameters: 'first' },
        CallExpression: { arguments: 'first' },
        ArrayExpression: 1,
        ObjectExpression: 1,
      }
    ],
    'no-mixed-spaces-and-tabs': 'error',
    'no-tabs': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-infix-ops': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'space-in-parens': ['error', 'never'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'indent': 'off',
        '@typescript-eslint/indent': 'off',
        'react/jsx-indent': ['error', 2],
        'react/jsx-indent-props': ['error', 2],
      }
    }
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
