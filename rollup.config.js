/* eslint-env node */

const babel = require('rollup-plugin-babel');
const extensions = require('rollup-plugin-import-resolver');
const json = require('rollup-plugin-json');
const path = require('path');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const node_resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'src/js/index.js',

  plugins: [
    extensions({
      extensions: ['.js', '.jsx', '.pcss', '.sss', '.json'],
      alias: {
        css: path.join(__dirname, 'src/css'),
        js: path.join(__dirname, 'src/js'),
      },
    }),

    json({
      preferConst: true,
      compact: true,
      namedExports: true,
    }),

    postcss({ inject: false }),

    node_resolve(),

    babel(),

    terser({
      ecma: 2019,
      warnings: true,
      module: true,
      compress: {
        passes: 2,
        keep_fargs: true, // We don't call `Function.length`.
        unsafe: true, // Fine in almost all circumstances.
        unsafe_arrows: true, // We don't rely on prototypes being present.
        unsafe_comps: true, // Allow switching the left and right side of comparisons.
      },
    }),
  ],

  external: [
    'https://unsafe-production.jspm.io/npm:marked@0.6.3',
  ],
};
