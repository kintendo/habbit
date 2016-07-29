'use strict';

const {db} = require('./firebaseService');
let userRef = undefined;

function initUser(uid) {
    userRef = db.ref(`users/${uid}`);
}

function setUserInfo(info) {
    userRef.set(info);
}

module.exports = {initUser, setUserInfo};
