/* eslint-env node */

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: false,
  },
  plugins: ['babel'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    preval: false,
  },
  extends: 'eslint:recommended',
  rules: {
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: false,
        objectsInObjects: false,
      },
    ],
    'no-async-promise-executor': 'error',
    'no-extra-parens': [
      'error',
      'all',
      {
        nestedBinaryExpressions: false,
      },
    ],
    'class-methods-use-this': 'error',
    complexity: 'error',
    curly: 'error',
    'dot-location': [
      'error',
      'property',
    ],
    'dot-notation': 'error',
    eqeqeq: 'error',
    'no-caller': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-multi-spaces': 'warn',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'createElement',
      },
    ],
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    radix: 'error',
    'require-await': 'error',
    yoda: 'error',
    'no-undef-init': 'error',
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
      },
    ],
    'array-bracket-spacing': 'error',
    'array-element-newline': [
      'error',
      'consistent',
    ],
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'function-paren-newline': [
      'error',
      'consistent',
    ],
    'implicit-arrow-linebreak': 'error',
    indent: [
      'error',
      2,
    ],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': 'error',
    'lines-around-comment': [
      'error',
      {
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'max-statements-per-line': 'error',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 2,
      },
    ],
    'no-array-constructor': 'error',
    'no-bitwise': 'warn',
    'no-lonely-if': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-negated-condition': 'error',
    'no-new-object': 'error',
    'no-ternary': 'error',
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': 'error',
    'one-var': [
      'error',
      'never',
    ],
    'operator-assignment': 'error',
    'operator-linebreak': [
      'error',
      'before',
    ],
    'padded-blocks': [
      'error',
      'never',
    ],
    'prefer-object-spread': 'error',
    'quote-props': [
      'error',
      'as-needed',
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-infix-ops': 'error',
    'spaced-comment': 'error',
    'generator-star-spacing': [
      'error',
      'after',
    ],
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': 'error',
    'sort-imports': [
      'error', {
        ignoreCase: true,
      },
    ],
    'template-curly-spacing': 'error',
    'yield-star-spacing': [
      'error',
      'after',
    ],
  },
};
