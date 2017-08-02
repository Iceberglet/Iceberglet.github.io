import React from 'react'
import ReactDOM from 'react-dom'
import './css/base.css'
import MainPage from './main-page'

// import browser from 'detect-browser'
//
// if (browser) {
//   console.log(browser.name);
//   console.log(browser.version);
// }

let div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(
  <MainPage />,
  // <Test />,
  div
);
