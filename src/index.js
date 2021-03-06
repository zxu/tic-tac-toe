import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from 'sagas';
import gameMiddleware from 'middlewares/game';
import 'index.css';
import App from 'App';
import reducers from 'reducers';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, gameMiddleware),
  ));

sagaMiddleware.run(rootSaga);

console.log = () => {};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
