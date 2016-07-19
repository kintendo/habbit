'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app.js');
var elm = document.getElementById('app');

if (elm) {
  ReactDOM.render(React.createElement(App), elm);
}
