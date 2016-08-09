'use strict';
const {db} = require('./firebaseService');
const {createNewCat} = require('./categoryService');

let habbitRef = undefined;

function initHabbits(uid) {
    return habbitRef = db.ref(`user-habbits/${uid}`);
}

function getHabbits() {
    if (!habbitRef) return;
    return habbitRef.once('value');
}

function createNewHabbit(habbit) {
    if (!habbitRef) return;
    const key = habbitRef.push().key;
    createNewCat(habbit.category);
    return habbitRef.child(key).set(habbit);
}

module.exports = {initHabbits, createNewHabbit, getHabbits};
