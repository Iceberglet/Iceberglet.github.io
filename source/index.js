import { App } from './app';
import { Test } from './Test.js'
import React from 'react'
import ReactDOM from 'react-dom'

import './css/base.css'
import './css/splash.css'

let div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(
  // <App />,
  <Test />,
  div
);
