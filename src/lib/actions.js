'use strict';

// view reducer
function changeView(view) {
    return {type: 'CHANGE_VIEW', view};
}

// user reducer
function setUserId(uid) {
    return {type: 'SET_USER_ID', uid};
}

// habbit reducer
function setCurrentHabbit(habbit) {
    return {type: 'SET_CURRENT_HABBIT', habbit};
}
function setHabbits(habbits) {
    return {type: 'SET_HABBITS', habbits};
}
function updateSingleHabbit(habbit) {
    return {type: 'UPDATE_SINGLE_HABBIT', habbit};
}

module.exports = {
    changeView,
    setCurrentHabbit,
    setHabbits,
    setUserId,
    updateSingleHabbit
};
