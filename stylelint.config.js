/* eslint-env node */

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-use-logical'],
  rules: {
    'csstools/use-logical': true,
    'at-rule-no-vendor-prefix': true,
    'declaration-empty-line-before': null,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    linebreaks: 'unix',
    'max-line-length': 80,
    'media-feature-name-no-vendor-prefix': true,
    'no-empty-first-line': true,
    'number-max-precision': 3,
    'property-no-vendor-prefix': true,
    'selector-max-universal': 1,
    'selector-no-vendor-prefix': true,
    'string-quotes': 'single',
    'time-min-milliseconds': 100,
    'value-no-vendor-prefix': true,

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'depth',
          'z-order',
          'corner-radius',
          'marker-style',
          'border-top-radius',
          'border-bottom-radius',
          'border-left-radius',
          'border-right-radius',
          'scrollbar-color',
          'scrollbar-width',
        ],
      },
    ],

    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],

    'unit-blacklist': [
      'q',
      'mm',
      'cm',
      'in',
      'pt',
      'pc',
      'cap',
      'ic',
      'lh',
      'rlh',
      'grad',
    ],
  },
};
