'use strict';

const {auth, facebookProvider} = require('./firebaseService');

function facebookLogin() {
    return auth.signInWithPopup(facebookProvider);
}

function getSession(callback) {
    return auth.onAuthStateChanged(callback);
}

module.exports = {facebookLogin, getSession};
