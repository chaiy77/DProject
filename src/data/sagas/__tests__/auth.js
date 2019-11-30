import { put, call, take } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';

import { actions, types } from 'data/reducers/auth';
import { autoLoginFlow } from '../auth';

test('auto login flow take login request', () => {
  const it = autoLoginFlow();
  const actual = it.next().value;
  const expected = take(types.AUTO_LOGIN_REQUEST);
  expect(actual).toEqual(expected);
});

test('auto login flow call to authenticated user', () => {
  const it = autoLoginFlow();
  it.next(); // request login
  const actual = it.next().value;
  const expected = call(
    [Auth, 'currentAuthenticatedUser'],
    Auth.currentAuthenticatedUser,
    {}
  );
  expect(actual).toEqual(expected);
});

test('auto login flow put login success', () => {
  const it = autoLoginFlow();
  it.next(); // request login
  it.next(); // authenticate
  const user = { username: 'smith' };
  const actual = it.next(user).value;
  const expected = put(actions.autoLoginSuccess(user));
  expect(actual).toEqual(expected);
});

test('auto login flow put login failure', () => {
  const it = autoLoginFlow();
  it.next(); // request login
  it.next(); // authenticate
  const error = { message: 'Failed to get current authenticated user' };
  const actual = it.throw(error).value;
  const expected = put(actions.autoLoginFailure(error));
  expect(actual).toEqual(expected);
});

test('auto login flow take logout request', () => {
  const it = autoLoginFlow();
  it.next(); // request login
  it.next(); // authenticate
  const user = { username: 'smith' };
  it.next(user); // put user
  const actual = it.next().value;
  const expected = take(types.LOGOUT_REQUEST);
  expect(actual).toEqual(expected);
});

test('auto login flow put logout success', () => {
  const it = autoLoginFlow();
  it.next(); // request login
  it.next(); // authenticate
  const user = { username: 'smith' };
  it.next(user); // put user
  it.next(); // request logout
  const actual = it.next().value;
  const expected = put(actions.logout());
  expect(actual).toEqual(expected);
});
