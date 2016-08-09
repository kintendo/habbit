'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const AppStore = require('./stores/AppStore');
const App = require('./app.js');
const elm = document.getElementById('app');

if (elm) {
    ReactDOM.render(
        <Provider store={AppStore}><App /></Provider>
    , elm);
}
