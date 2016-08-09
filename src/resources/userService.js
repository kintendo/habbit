'use strict';

const {db, auth} = require('./firebaseService');
let userRef = undefined;

function initUser(uid) {
    return userRef = db.ref(`users/${uid}`);
}

function getSessionUser() {
    return auth.currentUser;
}

function setUserInfo(info) {
    return userRef.once('value').then( (snapshot) => {
        if (!snapshot.exists()) {
            userRef.set(info);
        }
    });
}

module.exports = {initUser, getSessionUser, setUserInfo};
