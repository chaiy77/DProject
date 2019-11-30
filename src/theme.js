import merge from 'lodash.merge';
import preset from '@rebass/preset';

/*
 * https://rebassjs.org/theming
 * https://github.com/rebassjs/rebass/tree/master/packages/preset
 * https://github.com/rebassjs/rebass/issues/538
 * https://github.com/rebassjs/rebass/issues/621
 */
export default merge(preset, {
  colors: {
    // custom primary color
    // primary: 'tomato',
  },
  buttons: {
    primary: {
      backgroundColor: '#07c',
      '&:hover': {
        backgroundColor: 'tomato',
      },
    },
  },
});
