const assign = require('object-assign');
const initialState = {
    uid: undefined
};

function userReducer (state = initialState, action = {}) {
    switch (action.type) {
    case 'SET_USER_ID':
        return assign({}, state, {
            uid: action.uid
        });
    default:
        return state;
    }
}

module.exports = userReducer;
