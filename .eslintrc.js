module.exports = {
  root: true,
  // parserOptions: {
  //   parser: '@typescript-eslint/parser'
  // },
  env: {
    node: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: ['standard', 'plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
  // required to lint *.vue files
  plugins: ['html'],
  globals: {
    $: true,
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'semi': 0,
    'arrow-spacing': 0,
    'no-trailing-spaces': 0,
    'no-unused-vars': 0,
    'key-spacing': 0,
    'eqeqeq': 0,
    'space-infix-ops': 0,
    'curly': 0,
    'eol-last': 0,
    'brace-style': 0,
    'no-duplicate-imports': 0,
    'no-console': 0,
    'padded-blocks': 0,
    'camelcase': 0,
    'quotes': 0,
    'space-before-blocks': 0,
    'import/no-duplicates': 0,
    'spaced-comment': 0,
    'yoda': 0,
    'indent': 0,
    "valid-typeof": 0,
    "no-useless-escape": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-irregular-whitespace": 0,
    "no-redeclare": 0,
    'no-unexpected-multiline': 0,
    'no-inner-declarations': 0,
    'no-extra-boolean-cast': 0,
    'standard/object-curly-even-spacing': 0,
    'standard/no-callback-literal': 0,
    'vue/no-parsing-error': ['off'],
    'vue/no-unused-vars': 0,
    'no-constant-condition': 0
  }
}
