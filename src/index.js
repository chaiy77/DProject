import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';

import configureStore from './data/store';
import './index.css';
import awsConfigs from './aws-configs';
import UserApp from './containers/UserApp';

Amplify.configure(awsConfigs);
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>Index.js</div>
    <UserApp />
  </Provider>,
  document.getElementById('root')
);
