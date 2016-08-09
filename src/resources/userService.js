'use strict';

const {db} = require('./firebaseService');
let userRef = undefined;

function initUser(uid) {
    return userRef = db.ref(`users/${uid}`);
}

function setUserInfo(info) {
    return userRef.once('value').then( (snapshot) => {
        if (!snapshot.exists()) {
            userRef.set(info);
        }
    });
}

module.exports = {initUser, setUserInfo};
