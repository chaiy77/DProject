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
    'react/prop-types': [2, { ignore: ['children', 'cell'] }],
    'react/forbid-prop-types': [0, { forbid: ['array', 'object'] }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/prefer-default-export': 0,
    'react/jsx-curly-brace-presence': [
      0,
      { props: 'always', children: 'always' },
    ],
    'no-console': ['error', { allow: ['error'] }],
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
