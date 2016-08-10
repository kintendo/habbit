'use strict';

const {firebase} = require('./firebaseService');
const auth = firebase.auth();

function facebookLogin(callback) {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    facebookProvider.addScope('user_friends');
    return auth.signInWithPopup(facebookProvider).then( ({user}) => {

        // TODO: use token to access & store friends list
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = credential.accessToken;

        const fbUser = user.providerData[0];
        callback({
            uid: user.uid,
            facebook_id: fbUser.uid,
            email: fbUser.email,
            photo: fbUser.photoURL
        });
    });
}

function getSession(callback) {
    return auth.onAuthStateChanged(callback);
}

module.exports = {facebookLogin, getSession};
