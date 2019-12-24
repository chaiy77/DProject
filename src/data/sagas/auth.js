import { Auth } from 'aws-amplify';
import { call, put, take } from 'redux-saga/effects';
import * as R from 'ramda';

import { actions, types } from 'data/reducers/auth';

const username = R.path(['username']);
const attributes = R.path(['attributes']);
const user = R.applySpec({ username, attributes });

export function* autoLoginFlow() {
  while (true) {
    try {
      yield take(types.AUTO_LOGIN_REQUEST);
      const data = yield call(
        [Auth, 'currentAuthenticatedUser'],
        Auth.currentAuthenticatedUser,
        {
          /* Options
           * Set `bypassCache` to true will send a request to Cognito to get the latest user data
           */
          // bypassCache: true,
        }
      );
      yield put(actions.autoLoginSuccess(user(data)));
      yield take(types.LOGOUT_REQUEST);
      // console.log('before yield call Auth.signOut');
      // yield call(Auth.signOut());
      // console.log('after yield call Auth.signOut');
      yield put(actions.logout());
    } catch (error) {
      yield put(actions.autoLoginFailure(error));
    }
  }
}

/* Watcher
 */
export const authSagas = [autoLoginFlow()];
