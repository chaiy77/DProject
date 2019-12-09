import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'theme-ui';
import configureStore from './data/store';
import './index.css';
import awsConfigs from './aws-configs';
import UserApp from './containers/UserApp';
import theme from './theme';

Amplify.configure(awsConfigs);
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <UserApp />
      </ThemeProvider>
    </StylesProvider>
  </Provider>,
  document.getElementById('root')
);
