/* eslint-env node */

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-use-logical'],
  rules: {
    // Rules to disable for SugarSS syntax.
    'block-closing-brace-empty-line-before': null,
    'block-closing-brace-newline-after': null,
    'block-closing-brace-newline-before': null,
    'block-closing-brace-space-before': null,
    'block-opening-brace-newline-after': null,
    'block-opening-brace-space-after': null,
    'block-opening-brace-space-before': null,
    'declaration-block-semicolon-newline-after': null,
    'declaration-block-semicolon-space-after': null,
    'declaration-block-semicolon-space-before': null,
    'declaration-block-trailing-semicolon': null,

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

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'each',
          'svg-load',
        ],
      },
    ],

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'marker-style',
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
