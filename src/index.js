import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'immutable';
import configureStore from './redux/store/store';
import { RouterConfig } from './routes';
import './style/global.scss';


if ( __DEV__ ){
  console.log("现在是开发环境")
}

if (__PROD__) {
  console.log("现在是生产环境")
}

// const initialState = Immutable.Map();

const store = configureStore();
const root = document.getElementById('app');


// const history = syncHistoryWithStore( browserHistory, store );



render(
  <Provider store= { store }>
    <Router routes={ RouterConfig } history={ browserHistory }/>
  </Provider>,
  root
)
