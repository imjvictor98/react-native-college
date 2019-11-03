module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': [0, 'always'], // para poder usar o state no modo antigo, fora do construtor
    'react/prop-types': [0], // para ignorar os erros de chamada a props no modo antigo
    'react/static-property-placement': [0], // para ignorar os proptypes definidos no modo antigo
    'react/jsx-props-no-spreading': 'off', //para as props não se espalharem em meios aos arquivos
  },
};
