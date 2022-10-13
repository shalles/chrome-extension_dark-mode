module.exports = {
  env: {
    browser:       true,
    node:          true,
    es2022:        true,
    webextensions: true
    // chrome: 'readonly'
  },
  globals: {
    chrome: 'readonly'
  },
  extends:       [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended' ],
  overrides:     [],
  parser:        '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType:  'module',
  },
  plugins: [ '@typescript-eslint' ],
  rules:   {
    indent:                 [ 'error', 2 ],
    'linebreak-style':      [ 'error', 'unix' ],
    quotes:                 [ 'error', 'single' ],
    semi:                   [ 'error', 'always' ],
    'no-use-before-define': [
      'error',
      {
        functions:         false,
        classes:           false,
        variables:         true,
        allowNamedExports: false,
      },
    ],
    'comma-spacing':                  [ 'error', { 'before': false, 'after': true } ],
    'space-before-blocks':            [ 'error', 'always' ],
    // function
    'func-call-spacing':              [ 'error', 'never' ],
    'function-call-argument-newline': [ 'error', 'consistent' ],
    'wrap-iife':                      [ 'error', 'inside' ],
    'max-params':                     [ 'error', 3 ],
    'max-statements':                 [
      'error',
      20,
      { ignoreTopLevelFunctions: true }
    ],
    'max-lines-per-function': [ 'error', { max: 60, skipBlankLines: true, skipComments: true } ],
    // space
    'spaced-comment':         [ 'error', 'always' ],
    'space-unary-ops':        [
      'error',
      {
        words:    true,
        nonwords: false,
      },
    ],
    'object-curly-spacing':  [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'array-bracket-newline': [ 'error', { 'multiline': true, 'minItems': 3 } ],
    'array-element-newline': [ 'error', { 'multiline': true, 'minItems': 3 } ],
    'arrow-spacing':         [
      'error',
      {
        before: true,
        after:  true,
      },
    ],
    'block-spacing':      [ 'error', 'always' ],
    'no-trailing-spaces': 'error',
    'no-multi-spaces':    'error',
    'key-spacing':        [
      'error',
      {
        align: 'value',
      },
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after:  true,
      },
    ],
    // TS
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after:  true
      }
    ]
  },
};
