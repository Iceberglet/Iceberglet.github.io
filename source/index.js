import { App } from './app';
import { Test } from './app/Test.js'
import React from 'react'
import ReactDOM from 'react-dom'

import './css/base.css'

let div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(
  <App />,
  // <Test />,
  div
);
