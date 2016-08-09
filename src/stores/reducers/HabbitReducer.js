const assign = require('object-assign');
const initialState = {
    habbits: []
};

function habbitReducer (state = initialState, action = {}) {
    switch (action.type) {
    case 'SET_HABBITS':
        return assign({}, state, {
            habbits: action.habbits
        });
    default:
        return state;
    }
}

module.exports = habbitReducer;
