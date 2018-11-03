module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'color-functional-notation': true,
      },
    }),

    require('postcss-time-machine'),
    require('postcss-short-border-radius'),
    require('postcss-short-overflow'),
    require('postcss-short-size'),
    require('postcss-short-spacing'),
    require('postcss-calc'),
  ],
};
