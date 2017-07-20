// import { MainPage } from './app';
// import { Test } from './app/Test.js'
import React from 'react'
import ReactDOM from 'react-dom'
import './css/base.css'

import MainPage from './main-page'

let div = document.createElement('div');
div.className='occupy'
document.body.appendChild(div);
ReactDOM.render(
  <MainPage />,
  // <Test />,
  div
);
