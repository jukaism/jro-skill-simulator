module.exports = {
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-html',
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-html/vue'],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'extend', 'content', 'include'],
      },
    ],
    'no-descending-specificity': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export'],
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    'property-no-unknown': null,
    'scss/comment-no-loud': true,
    'scss/comment-no-empty': true,
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: ['stylelint-config-recommended'],
      rules: {
        'keyframes-name-pattern': null,
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.ts'],
}
