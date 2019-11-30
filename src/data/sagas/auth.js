import { Auth } from 'aws-amplify';
import { call, put, take } from 'redux-saga/effects';
import * as R from 'ramda';

import { actions, types } from 'data/reducers/auth';

const username = R.path(['username']);
const user = R.applySpec({ username });

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
      yield put(actions.logout());
    } catch (error) {
      yield put(actions.autoLoginFailure(error));
    }
  }
}

/* Watcher
 */
export const authSagas = [autoLoginFlow()];
