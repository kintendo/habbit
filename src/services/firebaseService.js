'use strict';

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

firebase.initializeApp({
    apiKey: "AIzaSyBZeAk7aMkE8lY6DKV4wtfVbvPbW0_UX70",
    authDomain: "habbit-ee166.firebaseapp.com",
    databaseURL: "https://habbit-ee166.firebaseio.com",
    storageBucket: ""
});

const db = firebase.database();
module.exports = {firebase, db};
