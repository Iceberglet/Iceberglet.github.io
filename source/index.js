import { App } from './app';
import React from 'react'
import ReactDOM from 'react-dom'

import './css/base.css'
import './css/splash.css'

let div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(
  <App />,
  div
);
