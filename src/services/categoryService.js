'use strict';
const {db} = require('./firebaseService');
const {sortCats} = require('../lib/sort');
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
        callback(sortCats(arr));
    });
}

function createNewCat(catName) {
    if (!catName) return;
    catRef.child(catName).once('value').then( (snapshot) => {
        if (!snapshot.exists()) {
            catRef.update({[catName]: true});
        }
    });
}

function updateCatOrder(cats, callback) {
    const catObj = {};
    cats.forEach( (cat, i) => {
        catObj[cat] = i;
    });
    catRef.update(catObj).then( (err) => {
        if(!err) {
            callback();
        }
    });
}

module.exports = {initCats, createNewCat, getCats, updateCatOrder};
