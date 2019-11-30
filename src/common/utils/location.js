import * as R from 'ramda';

export const rootPath = R.compose(
  R.join('/'),
  R.slice(0, 2),
  R.split('/')
);

export const locationPath = R.path(['pathname']);
export const locationRootPath = R.compose(
  rootPath,
  locationPath
);
