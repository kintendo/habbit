'use strict';

const {auth, facebookProvider} = require('./firebaseService');

function facebookLogin() {
    return auth.signInWithPopup(facebookProvider);
}

module.exports = {facebookLogin};
