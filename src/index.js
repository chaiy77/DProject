import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';

import configureStore from './data/store';
import './index.css';
import awsConfigs from './aws-configs';
import UserApp from './containers/UserApp';
import { ThemeProvider } from 'emotion-theming';
import theme from './theme';
import { Button } from 'common/components/base';

Amplify.configure(awsConfigs);
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme} >
      <UserApp />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
