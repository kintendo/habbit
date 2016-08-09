'use strict';

function changeView(view) {
    return {type: 'CHANGE_VIEW', view};
}

function setHabbits(habbits) {
    return {type: 'SET_HABBITS', habbits};
}

function setUserId(uid) {
    return {type: 'SET_USER_ID', uid};
}

module.exports = {
    changeView,
    setHabbits,
    setUserId
};
