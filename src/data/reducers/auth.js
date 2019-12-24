import { simpleAction, payloadAction } from './utils/actions';

export const types = {
  AUTO_LOGIN_REQUEST: '@auth/autoLogin/request`',
  AUTO_LOGIN_SUCCESS: '@auth/autoLogin/success',
  AUTO_LOGIN_FAILURE: '@auth/autoLogin/failure',
  LOGIN_SUCCESS: '@auth/login/success',
  LOGOUT_REQUEST: '@auth/logout/request',
  LOGOUT: '@auth/logout/success',
};

export const actions = {
  autoLoginRequest: simpleAction(types.AUTO_LOGIN_REQUEST),
  autoLoginSuccess: user => payloadAction(types.AUTO_LOGIN_SUCCESS)(user),
  autoLoginFailure: error => payloadAction(types.AUTO_LOGIN_FAILURE)(error),
  loginSuccess: user => payloadAction(types.LOGIN_SUCCESS)(user),
  logoutRequest: simpleAction(types.LOGOUT_REQUEST),
  logout: simpleAction(types.LOGOUT),
};

export const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case types.AUTO_LOGIN_REQUEST: {
    //   console.log("===== reducer.AUTO_LOGIN_REQUEST ===== ");
    //   console.log(action);
    //   return {
    //     ...state,
    //     user: null,
    //   };
    // }
    case types.AUTO_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case types.AUTO_LOGIN_FAILURE: {
      return {
        ...state,
        user: null,
      };
    }
    case types.LOGIN_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }
    // case types.LOGOUT_REQUEST: {
    //   console.log('call logout request');
    // }
    case types.LOGOUT: {
      //console.log('call logout');
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
