import reducer, { types, actions, initialState } from '../auth';

test('create auto login success action', () => {
  const user = { username: 'smith' };
  const actual = actions.autoLoginSuccess(user);
  const expected = {
    type: types.AUTO_LOGIN_SUCCESS,
    payload: user,
  };
  expect(actual).toEqual(expected);
});

test('create auto login failure action', () => {
  const error = { message: 'Failed to get current authenticated user' };
  const actual = actions.autoLoginFailure(error);
  const expected = {
    type: types.AUTO_LOGIN_FAILURE,
    payload: error,
  };
  expect(actual).toEqual(expected);
});

test('create login success action', () => {
  const user = { username: 'smith' };
  const actual = actions.loginSuccess(user);
  const expected = {
    type: types.LOGIN_SUCCESS,
    payload: user,
  };
  expect(actual).toEqual(expected);
});

test('create logout action', () => {
  const actual = actions.logout();
  const expected = {
    type: types.LOGOUT,
  };
  expect(actual).toEqual(expected);
});

test('reducer handle undefined initialState', () => {
  const actual = reducer(undefined, {});
  const expected = initialState;
  expect(actual).toEqual(expected);
});

test('reducer handle auto login success', () => {
  const user = { username: 'smith' };
  const actual = reducer(initialState, actions.loginSuccess(user));
  const expected = {
    ...initialState,
    user,
  };
  expect(actual).toEqual(expected);
});

test('reducer handle auto login failure', () => {
  const currentState = {
    user: { username: 'ida' },
  };
  const error = { message: 'Failed to get current authenticated user' };
  const actual = reducer(currentState, actions.autoLoginFailure(error));
  const expected = {
    ...currentState,
    user: null,
  };
  expect(actual).toEqual(expected);
});

test('reducer handle login success', () => {
  const user = { username: 'pall' };
  const actual = reducer(initialState, actions.loginSuccess(user));
  const expected = {
    ...initialState,
    user,
  };
  expect(actual).toEqual(expected);
});

test('reducer handle logout', () => {
  const currentState = {
    user: { username: 'ida' },
  };
  const actual = reducer(currentState, actions.logout());
  const expected = {
    ...currentState,
    user: null,
  };
  expect(actual).toEqual(expected);
});
