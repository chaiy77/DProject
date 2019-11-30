/* eslint-disable */

import log from './log';

// https://github.com/gajus/roarr#browser
// Ensure that `globalThis.ROARR` is configured.

globalThis.ROARR = globalThis.ROARR || {};

globalThis.ROARR.write = message => {
  console.log(JSON.parse(message));
};

export { log };
