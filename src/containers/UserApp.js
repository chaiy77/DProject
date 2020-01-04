import React from 'react';
import PropTypes from 'prop-types';
import { Hub } from 'aws-amplify';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'emotion-theming';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { ApolloProvider } from 'react-apollo';
import appSyncClient from 'appsyncClient';

import { Flex } from 'common/components/base';
import { MAuthenticator } from '../common/components/auth';
import { actions as authActions } from '../data/reducers/auth';

import Main from './Main';
import App from '../components/App';
import theme from '../theme';

const title = 'D-Project';

const renderAuthenticated = () => <Main title={title} />;
// const renderAuthenticated = () => <Main />;
const renderUnAuthenticated = () => (
  <Flex width={1} alignItems="center" justifyContent="center">
    <MAuthenticator />
  </Flex>
);
const listenToAuth = dispatch => {
  const login = R.compose(
    dispatch,
    authActions.loginSuccess,
    R.applySpec({ username: R.path(['payload', 'data', 'username']) })
  );
  Hub.listen('auth', data => {
    login(data);
  });
};

const UserApp = ({ user, dispatch }) => {
  React.useEffect(() => {
    listenToAuth(dispatch);
    dispatch(authActions.autoLoginRequest());
  }, []);

  return (
    <ApolloProvider client={appSyncClient}>
      <ThemeProvider theme={theme}>
        <App
          title={title}
          user={user}
          renderAuthenticated={renderAuthenticated}
          renderUnAuthenticated={renderUnAuthenticated}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
};

UserApp.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  dispatch: PropTypes.func,
};

UserApp.defaultProps = {
  user: null,
  dispatch: () => {},
};

const mapStateToProps = state => ({ user: state.auth.user });

export default hot(connect(mapStateToProps)(UserApp));
