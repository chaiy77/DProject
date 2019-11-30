import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default function configureStore() {
  const store = createStore(
    rootReducer,
    /* Use compose:
     * https://github.com/jhen0409/react-native-debugger/issues/280#issuecomment-438229613
     */
    compose(
      applyMiddleware(...middlewares),
      /* eslint-disable */
      /* Solved: Cannot read property 'apply' of undefined
       * https://github.com/reduxjs/redux/issues/2359#issuecomment-439435339
       */
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
      /* eslint-enable */
    )
  );

  // console.log("call Store run rootSaga");
  sagaMiddleware.run(rootSaga);
  return store;
}

export const runSagaMiddleware = () => sagaMiddleware.run(rootSaga);
