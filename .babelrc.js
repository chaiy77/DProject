module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    // https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion
    'emotion',
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',

    // Fixed: https://github.com/babel/babel/issues/8829
    '@babel/plugin-transform-runtime',
  ],
};