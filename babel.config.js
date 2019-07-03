/* eslint-env node */

module.exports = {
  plugins: [
    // Syntax plugins for custom-elements.
    // Other syntax plugins are included by other transformers.
    '@babel/syntax-jsx',
    ['@babel/syntax-decorators', { legacy: true }],

    // Does not include syntax plugins.
    './babel-plugin-custom-element/dist/index.js',

    '@babel/syntax-dynamic-import',
    '@babel/proposal-class-properties',
    '@babel/proposal-private-methods',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
    '@babel/proposal-do-expressions',
    ['@babel/proposal-pipeline-operator', { proposal: 'smart' }],
    '@babel/proposal-numeric-separator',
  ],
};
