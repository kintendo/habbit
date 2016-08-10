'use strict';
const assign = require('object-assign');
const {db} = require('./firebaseService');
const {createNewCat} = require('./categoryService');

let habbitRef = undefined;

function initHabbits(uid) {
    return habbitRef = db.ref(`user-habbits/${uid}`);
}

function getHabbits(callback) {
    if (!habbitRef) return;
    return habbitRef.once('value').then( (snapshot) => {
        const obj = snapshot.val();
        const keys = Object.keys(obj);
        const arr = keys.map( (key) => {
            return assign({}, obj[key], {key});
        });
        callback(arr);
    });
}

function createNewHabbit(habbit, callback) {
    if (!habbitRef) return;
    const key = habbitRef.push().key;
    createNewCat(habbit.category);
    return habbitRef.child(key).set(habbit, callback);
}

function updateHabbit(habbit, callback) {
    if (!habbitRef) return;
    createNewCat(habbit.category);
    const _habbit = assign({}, habbit);
    delete _habbit.key;
    return habbitRef.child(habbit.key).update(_habbit, callback);
}

module.exports = {initHabbits, createNewHabbit, getHabbits, updateHabbit};
