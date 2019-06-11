module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'jest': true
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    extends: ['eslint:recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        },
        sourceType: 'module'
    },
    plugins: [],
    rules: {
        indent: ['error', 4, { "SwitchCase": 1 }],
        'comma-dangle': ['error', 'never'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single', { 'allowTemplateLiterals': true }],
        semi: ['error', 'never'],
        'no-cond-assign': 1,
        'no-unused-vars': 1,
        'no-console': 'off',
        'no-useless-escape': 1,
        'no-control-regex': 1
    }
}