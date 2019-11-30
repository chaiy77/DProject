import * as R from 'ramda';

const isUndefined = R.o(R.equals('Undefined'), R.type);
const toActionTypeEquals = type => R.flip(R.whereEq({ type }));
const overHead = R.over(R.lensIndex(0));
const headToActionTypeChecker = overHead(toActionTypeEquals);

const switchReducer = (reducers, initialState) =>
  R.compose(
    R.cond,
    R.prepend([isUndefined, R.always(initialState)]),
    R.append([R.T, R.identity]),
    R.map(headToActionTypeChecker)
  )(reducers);

export default switchReducer;
