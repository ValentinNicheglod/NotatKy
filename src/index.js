import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reducer from './Redux/Reducers/Index'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

let store = createStore(reducer);
let root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);