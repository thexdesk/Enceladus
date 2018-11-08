/* eslint-env node */

module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'createElement',
        pragmaFrag: 'Symbol()',
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-optional-catch-binding',
    '@babel/plugin-proposal-object-rest-spread',
    'eval-when-possible',
  ],
};
