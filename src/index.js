import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './Redux/Index'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

let root = document.getElementById('root');

//style.value = darkMode ? '#343a40' : ''
//root.setAttributeNode(style)
axios.defaults.baseURL = `http://localhost:3001`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  root
);