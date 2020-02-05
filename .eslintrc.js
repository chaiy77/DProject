module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'import/newline-after-import': ['error', { count: 1 }],
    'react/prop-types': [2, { ignore: ['children'] }],
    'react/forbid-prop-types': { forbid: ['array', 'object'] },
  },
  settings: {
    'import/resolver': {
      /* Lint module resolver using webpack config:
        This help make absolute import by using webpack aliases.
        https://github.com/benmosher/eslint-plugin-import
        https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers/webpack#eslint-import-resolver-webpack
      */
      webpack: {
        config: './build-utils/webpack.common.js',
      },
      'import/resolver': {
        node: {
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
  overrides: [
    {
      // https://github.com/JoinColony/eslint-import-resolver-jest
      files: ['**/__tests__/**/*.js'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: './jest.config.js',
          },
        },
      },
    },
  ],
};
