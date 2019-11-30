import * as R from 'ramda';

test('create switchReducer', () => {
  /* We want to create the functional reducer that be looks like this
   *    (state, action) -> newState.
   * We will provides a list of reducer with each action type,
   * so that it can conditionaly select the right one when we use it with action.
   * We will use `R.cond` which encapsulates `if/else` logic.
   * The list of reducers will looks like this
   *    [
   *      [action_type_1_checker, reducer_1],
   *      [action_type_2_checker", reducer_2],
   *      ..
   *    ],
   * so that will can use this with `R.cond`
   */
  const user = { id: '1234' };
  const loginAction = { type: 'USER_LOGIN', payload: user };
  const logoutAction = { type: 'USER_LOGOUT' };
  const loginReducer = (state, action) => ({ ...state, user: action.payload });
  const logoutReducer = state => ({ ...state, user: null });

  // Funcs.
  const toActionTypeEquals = type => R.flip(R.whereEq({ type }));
  const overHead = R.over(R.lensIndex(0));
  //
  // Action type checker.
  // Note that we set state as `undefined`
  const isLoginAction = toActionTypeEquals('USER_LOGIN');
  expect(isLoginAction(undefined, loginAction)).toBeTruthy();
  expect(isLoginAction(undefined, logoutAction)).toBeFalsy();

  /* Create a function that can trnasform an array of reducers to an array of arrays of 2 functions, the `mapReducers`.
   * The first function is a checker action type.
   * The second function is the reducer of that action type.
   * [
        [ [Function: f1], [Function: loginReducer] ],
        [ [Function: f1], [Function: logoutReducer] ]
      ]
      */
  // Funcs.
  const headToActionTypeChecker = overHead(toActionTypeEquals);
  //
  const mapReducers = R.map(headToActionTypeChecker);
  let authReducer = mapReducers([
    ['USER_LOGIN', loginReducer],
    ['USER_LOGOUT', logoutReducer],
  ]);
  expect(authReducer[0][0](undefined, loginAction)).toBeTruthy();
  expect(authReducer[0][0](undefined, logoutAction)).toBeFalsy();
  expect(authReducer[1][0](undefined, loginAction)).toBeFalsy();
  expect(authReducer[1][0](undefined, logoutAction)).toBeTruthy();

  // Funcs: Start create `switchReducer` func.
  let switchReducer = reducers =>
    R.compose(
      R.cond,
      R.map(headToActionTypeChecker)
    )(reducers);
  //
  const authReducerList = [
    ['USER_LOGIN', loginReducer],
    ['USER_LOGOUT', logoutReducer],
  ];
  authReducer = switchReducer(authReducerList);
  expect(authReducer(undefined, loginAction)).toEqual({ user });
  expect(authReducer(undefined, logoutAction)).toEqual({ user: null });

  // Funcs: Append the default reducer, for no match action (like default switch case),
  // just return the received state.
  switchReducer = reducers =>
    R.compose(
      R.cond,
      R.append([R.T, R.identity]),
      R.map(headToActionTypeChecker)
    )(reducers);
  //
  authReducer = switchReducer(authReducerList);
  expect(
    authReducer({ yyy: '456' }, { type: 'xxx-action', payload: { xxx: '345' } })
  ).toEqual({ yyy: '456' });

  // Funcs.
  const isUndefined = R.o(R.equals('Undefined'), R.type);
  let x;
  expect(isUndefined(x)).toBeTruthy();
  //
  // Funcs: Prepend `undefined` state checker,
  // just return the `initialState`
  switchReducer = (reducers, initialState) =>
    R.compose(
      R.cond,
      R.prepend([isUndefined, R.always(initialState)]),
      R.append([R.T, R.identity]),
      R.map(headToActionTypeChecker)
    )(reducers);
  //
  const initialAuthState = { user: null };
  authReducer = switchReducer(authReducerList, initialAuthState);
  expect(authReducer(undefined, {})).toEqual(initialAuthState);
  expect(
    authReducer(undefined, { type: 'xxx-action', payload: { xxx: '345' } })
  ).toEqual(initialAuthState);
  expect(
    authReducer(initialAuthState, {
      type: 'USER_LOGIN',
      payload: { id: '444abc' },
    })
  ).toEqual({ user: { id: '444abc' } });
  expect(authReducer(initialAuthState, { type: 'USER_LOGOUT' })).toEqual({
    user: null,
  });
});
