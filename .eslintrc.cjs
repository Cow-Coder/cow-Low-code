/** @type {import("eslint-define-config").EslintConfig} */
module.exports = {
  root: true,
  extends: ['@element-plus/eslint-config'],
  overrides: [
    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/one-component-per-file': 'off',
  },
}
