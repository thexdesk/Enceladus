/* eslint-env node */

module.exports = {
  parser: 'sugarss',
  plugins: [
    // Static imports
    require('postcss-import'),

    // Newer CSS features not widely supported
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'color-functional-notation': true,
        'logical-properties-and-values': { dir: 'ltr' },
      },
    }),

    // Simple iterator
    require('postcss-each'),

    // Compute when possible
    require('postcss-calc'),

    // Inline SVGs
    require('postcss-inline-svg-multipath')({
      paths: [
        'src/assets/svg',
        'node_modules/@fortawesome/fontawesome-free/svgs',
      ],
    }),

    // Minifiaction
    require('cssnano'),
  ],
};
