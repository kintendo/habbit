'use strict';

const {db} = require('./firebaseService');
let catRef = undefined;

function initCats(uid) {
    catRef = db.ref(`user-categories/${uid}`);
}

function createNewCat(catName) {
    catRef.child(catName).once('value').then ( (snapshot) => {
        if (!snapshot.exists()) {
            catRef.update({[catName]: true});
        }
    });
}

module.exports = {initCats, createNewCat};
