const assign = require('object-assign');
const initialState = {
    view: 'login'
};

function viewReducer (state = initialState, action = {}) {
    switch (action.type) {
    case 'CHANGE_VIEW':
        return assign({}, state, {
            view: action.view
        });
    default:
        return state;
    }
}

module.exports = viewReducer;
