module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'color-function-notation': null,
    'function-url-quotes': null,
    'property-no-vendor-prefix': null,
    'no-empty-source': null,
    'selector-id-pattern': null,
    'selector-class-pattern': null,
    'scss/at-rule-no-unknown': null,
    'selector-pseudo-element-no-unknown': null,
  },
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
}
