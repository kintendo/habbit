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

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_friends');

const db = firebase.database();
const auth = firebase.auth();

module.exports = {firebase, db, auth, facebookProvider};

/*
const user = {
    id: 12312,
    username: 'kintendo',
    first_name: 'Kin',
    last_name: 'Thai',
    profile_photo: 'http://asdf.com/coolpic.jpg',
    habbits: [234, 235, 234, 234],
    categories: [234, 523, 234, 234] // need this for order/sorting
};

const habbit = {
    id: 356,
    name: '',
    completion_history: [
        {date_completed: '2016-07-25T07:48:34-07:00', completed_by: 12312},
        {date_completed: '2016-07-25T07:48:34-07:00', completed_by: 12312},
        {date_completed: '2016-07-25T07:48:34-07:00', completed_by: 12312}
    ],
    tags: [
        3, 4, 6
    ],
    last_completed: '2016-07-25T07:48:34-07:00',
    description: '',
    category: 4,
    date_added: '2016-07-25T07:48:34-07:00',
    reminder: {
        howOften: 'once' | 'weekly' | 'monthly'
    },
    created_by: 12312
};

// events (habbits), tags, categories

const category = {
    id: 134,
    name: 'Chores'
};

const tag = {
    id: 234,
    name: 'house'
};
*/
