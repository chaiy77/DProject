// Cannot using `export *` withou `eslint` warning
// `[eslint import/named] [E] render not found in 'test-utils' (import/named)`
// https://github.com/benmosher/eslint-plugin-import/issues/920
// https://github.com/benmosher/eslint-plugin-import/issues/1446
//
// export * from '@testing-library/react';

import { render, cleanup, act } from '@testing-library/react';

export { render, cleanup, act };
