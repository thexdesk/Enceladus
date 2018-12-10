module.exports = {
  plugins: [
    require('postcss-import'),

    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'color-functional-notation': true,
        'logical-properties-and-values': { dir: 'ltr' },
      },
    }),

    require('postcss-simple-vars'),
    require('postcss-time-machine'),
    require('postcss-short-border-radius'),
    require('postcss-short-overflow'),
    require('postcss-short-size'),
    require('postcss-short-spacing'),
    require('postcss-calc'),
    require('postcss-inline-svg-multipath')({
      paths: [
        'src/assets/svg',
        'node_modules/@fortawesome/fontawesome-free/svgs',
      ],
    }),
    require('postcss-svgo'),
    require('cssnano'),
  ],
};
