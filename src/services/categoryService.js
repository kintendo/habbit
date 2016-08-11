'use strict';
const {db} = require('./firebaseService');
let catRef = undefined;

function initCats(uid) {
    catRef = db.ref(`user-categories/${uid}`);
}

function getCats(callback) {
    catRef.once('value').then( (snapshot) => {
        const obj = snapshot.val();
        const keys = Object.keys(obj);
        const arr = keys.map( (key) => {
            return {name: key, index: obj[key]};
        });
        callback(arr);
    });
}

function createNewCat(catName) {
    catRef.child(catName).once('value').then ( (snapshot) => {
        if (!snapshot.exists()) {
            catRef.update({[catName]: true});
        }
    });
}

module.exports = {initCats, createNewCat, getCats};
