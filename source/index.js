import { MainPage } from './app';
import { Test } from './app/Test.js'
import React from 'react'
import ReactDOM from 'react-dom'

import './css/base.css'
// import 'font-awesome/css/font-awesome.css'

let div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(
  <MainPage />,
  // <Test />,
  div
);
