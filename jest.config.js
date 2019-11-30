module.exports = {
  testEnvironment: 'jest-environment-jsdom',

  /* Absolute import:
    https://testing-library.com/docs/react-testing-library/setup#configuring-jest-with-test-utils
   */
  moduleDirectories: ['node_modules', 'src', 'test'],

  /* Handling Static Assets:
    https://jestjs.io/docs/en/webpack.html#handling-static-assets
  */
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/styleMock.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './test/fileMock.js'
    ),
  },
};
